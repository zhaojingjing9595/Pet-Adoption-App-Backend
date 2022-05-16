import authModel from "../models/authModel.js";
import jwt from "jsonwebtoken";

async function login(req, res, next) {
  try {
    const user = await authModel.login(req.body.email, req.body.password);
    if (!user) {
      res.status(401).send([{ message: "wrong email or password!" }]);
      return;
    } else {
      delete user.hashPassword;
      delete user.password;

      // create token:
      const token = jwt.sign(Object.assign({}, user), process.env.JWT_SECRET);
      // res.send({user, token});
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production" ? true : false,
      });
      res.send(user);
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function signUp(req, res, next) {
  try {
    const newUser = req.body;
    const user = await authModel.signUp(newUser);
    if (user) {
      delete user.password;
      delete user.hashPassword;

      // create token:
      const token = jwt.sign(Object.assign({}, user), process.env.JWT_SECRET);
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production" ? true : false,
      });
      res.send(user);
      next();
    }
  } catch (error) {
    next(error);
  }
}

export default { login, signUp };
