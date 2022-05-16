import { appDB } from "../index.js"

async function getUserById(userId) { 
  const result = await appDB.from("users").where({ userId }).first();
  return result;
}

async function updateUserById(userId, newUser) {
    const affectedRow = await appDB.from("users").where({ userId }).update(newUser);
    if (affectedRow===1) {
      const user = await appDB.from("users").where({ userId }).first();
      return user;
    } 
}
async function addOrCancelAdmin(userId, adminProp) {
 const affectedRow = await appDB
   .from("users")
   .where({ userId })
   .update(adminProp);
   if (affectedRow === 1) {
     const user = await appDB.from("users").where({ userId }).first();
     return user;
   } 
}

async function getUsers() {
    const users = await appDB.from("users").select();
    return users;
}

async function getUserFullInfoById(userId) {
    const userProfile = await appDB.from("users").where({ userId }).first();
    delete userProfile.hashPassword;
    const userOwnedPets = await appDB.from("pets").where({ ownerId: userId });
    const userInfo = { userProfile, userOwnedPets };
    return userInfo;
}

export default {
  getUserById,
  updateUserById,
  getUsers,
  getUserFullInfoById,
  addOrCancelAdmin,
};