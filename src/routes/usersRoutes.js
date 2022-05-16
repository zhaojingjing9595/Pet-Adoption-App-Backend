import express from "express";
import usersController from "../controllers/usersController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const usersRouter = express.Router();

usersRouter
  .route("/")
  .get(
    authMiddleware.authenticated,
    authMiddleware.isAdminCheck,
    usersController.getUsers
  );

usersRouter
  .route("/:id")
  .get(
    authMiddleware.authenticated,
    authMiddleware.isLoggedInUserReqParamsCheck,
    usersController.getUserById
  )
  .put(
    authMiddleware.authenticated,
    authMiddleware.isLoggedInUserReqParamsCheck,
    authMiddleware.userProfileValidate,
    authMiddleware.uniqueEmailProfileChange,
    authMiddleware.encryptPasswordProfileChange,
    usersController.updateUserById
  );

usersRouter
  .route("/:id/admin")
  .put(
    authMiddleware.authenticated,
    authMiddleware.isAdminCheck,
    usersController.addOrCancelAdmin
  );

usersRouter
  .route("/:id/full")
  .get(
    authMiddleware.authenticated,
    authMiddleware.isLoggedInUserReqParamsCheck,
    usersController.getUserFullInfoById
  );

export default usersRouter;
