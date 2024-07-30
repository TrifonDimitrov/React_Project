const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.SALTROUNDS) || 5;

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      minlength: [4, "Username should be at least 4 characters"],
    },
    password: {
      type: String,
      required: true,
      minlength: [4, "Password should be at least 4 characters"],
    },
    climates: [{
      type: ObjectId,
      ref: "Climate",
      require: true,
    }],
  },
  { timestamps: { createdAt: "created_at" } }
);

userSchema.methods = {
  matchPassword: function (password) {
    return bcrypt.compare(password, this.password);
  },
};

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        next(err);
      }
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          next(err);
        }
        this.password = hash;
        next();
      });
    });
    return;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
// const User = mongoose.model("User", userSchema);
// module.exports = User;
