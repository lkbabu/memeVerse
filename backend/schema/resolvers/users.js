const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../validators/validators");
module.exports = {
  Mutation: {
    async login(parent, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      const user = await User.findOne({ username });

      if (!valid) {
        throw new UserInputError("errors", { errors });
      }

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("user not found", { errors });
      }
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = "Wrong credential";
        throw new UserInputError("wrong credential", { errors });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        "secretkeyall",
        { expiresIn: "24h" }
      );
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      parent,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Error", { errors });
      }

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("username is taken", {
          error: {
            username: "this username is taken",
          },
        });
      }

      password = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        username,
        password,
        confirmPassword,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();
      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        "secretkeyall",
        { expiresIn: "1h" }
      );
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
