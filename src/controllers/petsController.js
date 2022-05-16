import petsModel from "../models/petsModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

async function getPets(req, res, next) {
  try {
    const queries = req.query;
    const pets = await petsModel.getPets(queries);
    res.send(pets);
    next();
  } catch (error) {
    next(error);
  }
}

async function getAllPets(req, res, next) {
  try {
    const pets = await petsModel.getAllPets();
    res.send(pets);
    next();
  } catch (error) {
    next(error);
  }
}

async function getPetById(req, res, next) {
  try {
    const pet = await petsModel.getPetById(req.params.id);
    if (pet) {
      res.send(pet);
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function addPet(req, res, next) {
  try {
    const uploadResult =
      req.file && (await cloudinary.uploader.upload(req.file.path));
    req.file && uploadResult && fs.promises.unlink(req.file.path);
    // const { type, name, adoptionStatus, picture, breed, height, weight, color, bio, hypoallergenic, dietary, ownerId } = req.body;
    // console.log(req.body);
    const pet = await petsModel.addPet({
      ...req.body,
      picture: uploadResult ? uploadResult.secure_url : null,
    });
    if (pet) {
      res.send(pet);
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function editPetById(req, res, next) {
  try {
    const petId = req.params.id;
    const uploadResult =
      req.file && (await cloudinary.uploader.upload(req.file.path));
    req.file && uploadResult && fs.promises.unlink(req.file.path);
    let newPet = req.body;
    if (uploadResult) {
      newPet = {
        ...req.body,
        picture: uploadResult.secure_url,
      };
    }
    const pet = await petsModel.editPetById(petId, newPet);
    if (pet) {
      res.send(pet);
      next();
    } else {
      res.status(400).send("no such pet");
    }
  } catch (error) {
    next(error);
  }
}

async function adoptOrFosterPet(req, res, next) {
  try {
    // frontend api: arguments (userId, adoptOrFosterType, id/petId)
    const userId = req.body.userId;
    const adoptionStatus = req.body.adoptOrFosterType;
    const petId = req.params.id;
    // console.log(req.params.id);
    const pet = await petsModel.adoptOrFosterPet(userId, adoptionStatus, petId);
    // console.log("pet: ", pet);
    if (pet) {
      res.send(pet);
      next();
    } else {
      res.status(400).send("add to adopt or foster failed");
    }
  } catch (error) {
    next(error);
  }
}

async function returnPet(req, res, next) {
  try {
    // frontend api: arguments (userId, id/petId), maybe no need for userId
    const userId = req.body.userId;
    const petId = req.params.id;
    const pet = await petsModel.returnPet(userId, petId);
    if (pet) {
      res.send(pet);
      next();
    } else {
      res.status(400).send("return pet failed");
    }
  } catch (error) {
    next(error);
  }
}
async function savePet(req, res, next) {
  try {
    const userId = req.body.userId;
    const petId = req.params.id;
    const savedPet = await petsModel.savePet(userId, petId);
    if (savedPet) {
      res.send(savedPet);
      next();
    } else {
      res.status(400).send("save pet failed");
    }
  } catch (error) {
    next(error);
  }
}
async function deleteSavedPet(req, res, next) {
  try {
    const userId = req.body.userId;
    const petId = req.params.id;
    const affectedRow = await petsModel.deleteSavedPet(userId, petId);
    if (affectedRow === 1) {
      res.status(200).send("delete success");
      next();
    } else {
      res.status(400).send("delete saved pet failed");
    }
  } catch (error) {
    next(error);
  }
}
async function getPetsByUserId(req, res, next) {
  try {
    const userId = req.params.id;
    const result = await petsModel.getPetsByUserId(userId);
    if (result) {
      res.send(result);
      next();
    } else {
      res.status(400).send("get pets by userId failed");
    }
  } catch (error) {
    next(error);
  }
}
export default {
  getPets,
  getAllPets,
  addPet,
  getPetById,
  editPetById,
  adoptOrFosterPet,
  returnPet,
  savePet,
  deleteSavedPet,
  getPetsByUserId,
};
