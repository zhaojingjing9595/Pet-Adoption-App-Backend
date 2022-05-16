import Ajv from "ajv";
import addFormat from "ajv-formats";
import ajvErrors from "ajv-errors";

import { addPetSchema, searchPetsSchema } from "../data/petsSchema.js";

const ajv = new Ajv({ allErrors: true });
addFormat(ajv);
ajvErrors(ajv);
const addPetValidate = ajv.compile(addPetSchema);
const searchPetsValidate = ajv.compile(searchPetsSchema);

function addPetValidation(req, res, next) { 
    try {
        console.log(req.body);
        const addPetValid = addPetValidate(req.body);
        console.log("addPet schema is valid? " + addPetValid);
        if (addPetValid) {
            next();
        } else { 
            res.status(400).send(addPetValidate.errors);
        }
    } catch (error) {
        next(error)
    }
}

function searchPetsValidation(req, res, next) {
    try {
        const searchPetsValid = searchPetsValidate(req.query);
        console.log("search pets schema is valid? " + searchPetsValid);
        if (searchPetsValid) {
            next();
        } else { 
            res.status(400).send(searchPetsValidate.errors)
        }
    } catch (error) {
        next(error)
    }
}

export default { addPetValidation, searchPetsValidation };
