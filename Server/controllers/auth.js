const { userModel, tokenBlackList } = require("../models");

const utils = require("../utils");
const { authCookieName } = require("../app-config");

const bsonToJson = (data) => {
  return JSON.parse(JSON.stringify(data));
};
const removePassword = (data) => {
  const { password, __v, ...userData } = data;
  return userData;
};

async function register(req, res, next) {
  const { userName, email, password, rePassword } = req.body;

  if (password !== rePassword) {
    return res.status(400).send({ message: "Passwords do not match!" });
  }

  try {
    let createdUser = await userModel.create({ userName, email, password });
    createdUser = bsonToJson(createdUser);
    createdUser = removePassword(createdUser);

    const token = utils.jwt.createToken({ id: createdUser._id });
    if (process.env.NODE_ENV === "production") {
      res.cookie(authCookieName, token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
    } else {
      res.cookie(authCookieName, token, { httpOnly: true });
    }
    res
      .status(200)
      .send({ user: createdUser, token, email, userId: createdUser._id });
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      let field = err.message.split("index: ")[1];
      field = field.split(" dup key")[0];
      field = field.substring(0, field.lastIndexOf("_"));

      res.status(409).send({ message: `This ${field} is already registered!` });
      return;
    }
    next(err);
  }
}

function login(req, res, next) {
  const { email, password } = req.body;

  userModel
    .findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: "Wrong email or password" });
      }

      return Promise.all([user, user.matchPassword(password)]).then(
        ([user, match]) => {
          if (!match) {
            return res.status(401).send({ message: "Wrong email or password" });
          }
          user = bsonToJson(user);
          user = removePassword(user);

          const token = utils.jwt.createToken({ id: user._id });

          if (process.env.NODE_ENV === "production") {
            res.cookie(authCookieName, token, {
              httpOnly: true,
              sameSite: "none",
              secure: true,
            });
          } else {
            res.cookie(authCookieName, token, { httpOnly: true });
          }
          res.status(200).send({ user, token, email, userId: user._id });
        }
      );
    })
    .catch(next);
}

function logout(req, res) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "No token provided!" });
  }

  tokenBlackList
    .create({ token })
    .then(() => {
      res.status(204).send({ message: "Logged out!" });
    })
    .catch((err) => res.status(500).send(err));
}

function getProfileInfo(req, res, next) {
  const { _id: userId } = req.user;

  userModel
    .findOne({ _id: userId }, { password: 0, __v: 0 })
    .populate("climates")
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
}

function editProfileInfo(req, res, next) {
  const { _id: userId } = req.user;
  const { userName, email, tel } = req.body;

  userModel
    .findOneAndUpdate(
      { _id: userId },
      { userName, email, tel },
      { runValidators: true, new: true }
    )
    .then((x) => {
      res.status(200).json(x);
    })
    .catch(next);
}

function deleteProfile(req, res, next) {
  const { _id: userId } = req.user;

  userModel
    .findByIdAndDelete(userId)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found!" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    })
    .catch(next);
}

module.exports = {
  register,
  login,
  logout,
  getProfileInfo,
  editProfileInfo,
  deleteProfile,
};
