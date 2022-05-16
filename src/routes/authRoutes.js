import express from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter
  .route("/login")
  .post(
    authMiddleware.noEmptyLoginFields,
    authMiddleware.userLoginValidate,
    authController.login
  );

authRouter
  .route("/signup")
  .post(
    // authMiddleware.noEmptySignUpFields,
    authMiddleware.userSignUpValidate,
    authMiddleware.uniqueEmail,
    // authMiddleware.checkRePasswordMatch,
    authMiddleware.encryptPassword,
    authController.signUp
  );

export default authRouter;
