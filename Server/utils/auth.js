const jwt = require('./jwt');
const { authCookieName } = require('../app-config');
const { userModel, tokenBlackList} = require('../models')

function auth(redirectUnauthenticated = true) {
    return function (req, res, next) {
      const token = req.headers.authorization?.split(' ')[1] || "";
      // const token = req.cookies[authCookieName] || "";
      Promise.all([
        jwt.verifyToken(token),
        tokenBlackList.findOne({ token }),
      ])
        .then(([data, blacklistedToken]) => {
          if (blacklistedToken) {
            console.error("Token is blacklisted:", token); // Логване на черния списък
            return Promise.reject(new Error("blacklisted token"));
          }
          return userModel.findById(data.id);
      })
      .then((user) => {
        if (!user) {
          console.error("User not found for token:", token); // Логване на липсващ потребител
          return Promise.reject(new Error("user not found"));
        }
        req.user = user;
        req.isLogged = true;
        next();
      })
      .catch((err) => {
        if (!redirectUnauthenticated) {
          next();
          return;
        }
        if (
          [
            "token expired",
            "blacklisted token",
            "jwt must be provided",
            "user not found"
          ].includes(err.message)
        ) {
          console.error("Authentication error:", err.message); // Логване на причината за провал
          res.status(401).send({ message: "Invalid token!" });
          return;
        }
        next(err);
      });
  };
}

module.exports = auth;