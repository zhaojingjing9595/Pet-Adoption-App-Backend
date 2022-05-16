import { appDB } from "../index.js";
import bcrypt from "bcrypt";

async function login(email, password) {
  try {
    const user = await appDB.from("users").where({ email, password }).first();
      if (user && (await bcrypt.compare(password, user.hashPassword))) {
          return user;
      } else { 
          return false
      }
  } catch (error) {
    next(error);
  }
}

async function signUp(newUser) {
  const userId = await appDB.from("users").insert(newUser);
  const user = await appDB.from("users").where({ userId: userId[0] }).first();
  return user;
}

export default { login, signUp };
