import express from "express";
import petsController from "../controllers/petsController.js";
import petsMiddleware from "../middlewares/petsMiddleware.js";
import multer from "multer";
import authMiddleware from "../middlewares/authMiddleware.js";

const upload = multer({ dest: process.env.UPLOAD_FOLDER + "/" });

const petsRouter = express.Router();

petsRouter
  .route("/")
  .get(petsMiddleware.searchPetsValidation, petsController.getPets)
  .post(
    authMiddleware.authenticated,
    authMiddleware.isAdminCheck,
    upload.single("picture"),
    // petsMiddleware.addPetValidation,
    petsController.addPet
  );

petsRouter.route("/all").get(petsController.getAllPets);

petsRouter.route("/:id").get(petsController.getPetById).put(
  authMiddleware.authenticated,
  authMiddleware.isAdminCheck,
  upload.single("picture"),
  // petsMiddleware.addPetValidation,
  petsController.editPetById
);

petsRouter
  .route("/:id/adopt")
  .post(
    authMiddleware.authenticated,
    authMiddleware.isLoggedInUserReqBodyCheck,
    petsController.adoptOrFosterPet
  );

petsRouter
  .route("/:id/return")
  .post(
    authMiddleware.authenticated,
    authMiddleware.isLoggedInUserReqBodyCheck,
    petsController.returnPet
  );

petsRouter
  .route("/:id/save")
  .post(
    authMiddleware.authenticated,
    authMiddleware.isLoggedInUserReqBodyCheck,
    petsController.savePet
  )
  .delete(
    authMiddleware.authenticated,
    authMiddleware.isLoggedInUserReqBodyCheck,
    petsController.deleteSavedPet
  );

petsRouter
  .route("/user/:id")
  .get(
    authMiddleware.authenticated,
    authMiddleware.isLoggedInUserReqParamsCheck,
    petsController.getPetsByUserId
  );
export default petsRouter;
