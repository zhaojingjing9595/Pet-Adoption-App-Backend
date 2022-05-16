import { appDB } from "../index.js";

async function addPet(newPet) {
  const petId = await appDB.from("pets").insert(newPet);
  const result = await appDB.from("pets").where({ petId: petId[0] }).first();
  return result;
}

async function getPetById(petId) {
  const result = await appDB.from("pets").where({ petId: petId }).first();
  return result;
}

async function editPetById(petId, newPet) {
  const id = await appDB.from("pets").where({ petId }).update(newPet);
  if (id) {
    const result = await appDB.from("pets").where({ petId: id }).first();
    return result;
  } else {
    return [];
  }
}

async function getPets(queries) {
    const queryLength = Object.keys(queries).length;
    console.log("query length: ",queryLength);
    let results;
    if (queryLength == 0) {
      results = await appDB.from("pets").select();
    } else if (queryLength == 1 && queries.type) {
      results = await appDB.from("pets").where(queries);
    } else {
      const {
        type,
        adoptionStatus,
        name,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
      } = queries;
      results = await appDB
        .from("pets")
        .where("type", "like", `%${type}%`)
        .andWhere(" adoptionStatus ", "like", `%${adoptionStatus}%`)
        .andWhere("name", "like", `%${name}%`)
        .whereBetween("height", [minHeight || 0, maxHeight || 1000])
        .whereBetween("weight", [minWeight || 0, maxWeight || 1000])
        .orderBy("petId", "desc");
    }
  console.log("number of search results: ",results.length);
  return results;
}

async function getAllPets() { 
  const pets = await appDB.from("pets").select();
  return pets;
}

async function adoptOrFosterPet(userId, adoptionStatus, petId) {
    const result = await appDB
        .from("pets").where({petId:petId})
      .update({ adoptionStatus: adoptionStatus, ownerId: userId });
    if (result) {
        const pet = await appDB.from("pets").where({ petId:petId });
        return pet[0];
    } else { 
        return [];
    }
}

async function returnPet(userId, petId) { 
  const result = await appDB
    .from("pets")
    .where({ petId, ownerId:userId })
    .update({ adoptionStatus: "Available", ownerId:null });
  if (result) {
    const pet = await appDB.from("pets").where({ petId });
    return pet[ 0 ];
  } else return [];
} 

async function savePet(userId, petId) {
  // const id = await appDB.from('saved-pets').insert({ userId, petId });
  const id = await appDB.from("users-saved-pets").insert({ userId, petId });
  // const result = await appDB.from("saved-pets").where({ userId, petId });
  const result = await appDB.from("users-saved-pets").where({ userId, petId });
  return result[0]
}

async function deleteSavedPet(userId, petId) {
  // const affectedRow = await appDB.from("saved-pets").where({ userId: userId, petId: petId }).del();
  const affectedRow = await appDB
    .from("users-saved-pets")
    .where({ userId: userId, petId: petId })
    .del();
  return affectedRow;
}

async function getPetsByUserId(userId) {
  const ownedPets = await appDB.from("pets").where({ ownerId: userId });
  // const savedPets = await appDB.from("saved-pets")
  //   .join("pets", "saved-pets.petId", "pets.petId")
  //   .where({ "saved-pets.userId": userId });
  const savedPets = await appDB
    .from("users-saved-pets")
    .join("pets", "users-saved-pets.petId", "pets.petId")
    .where({ "users-saved-pets.userId": userId });
  return [ownedPets,savedPets];
}

export default {
  addPet,
  getPetById,
  editPetById,
  getPets,
  getAllPets,
  adoptOrFosterPet,
  returnPet,
  savePet,
  deleteSavedPet,
  getPetsByUserId,
};
