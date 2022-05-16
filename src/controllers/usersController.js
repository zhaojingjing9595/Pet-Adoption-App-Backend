import usersModel from '../models/usersModel.js'

async function getUsers(req, res, next) {
  try {
    const users = await usersModel.getUsers();
    users.forEach((user) => {
      delete user.password;
      delete user.hashPassword;
    });
    res.send(users);
    next();
  } catch (error) {
    next(error)
  }
}

async function getUserById(req, res, next) { 
  try {    
    const userId = req.params.id;
    const user = await usersModel.getUserById(userId);
    if (user) {
      delete user.password;
      delete user.hashPassword;
      res.send(user);
      next();
    } else {
      res.status(400).send([{message: "no such user!"}]);
      return;
    }
  } catch (error) {
    next(error)
  }
}

async function addOrCancelAdmin(req, res, next) {
  try {
    const userId = req.params.id;
    const adminProp = req.body;
    const user = await usersModel.addOrCancelAdmin(userId, adminProp);
     if (user) {
       delete user.hashPassword;
       delete user.password;
       res.send(user);
       next();
     } else {
       res.status(400).send([{ message: "Change user's admin status failed" }]);
     }
  } catch (error) {
     next(error);
  }
}

async function updateUserById(req, res, next) { 
  try {
    const userId = req.params.id;
    const newProfile = req.body;
    const user = await usersModel.updateUserById(userId, newProfile);
    if (user) {
      delete user.hashPassword;
      delete user.password;
      res.send(user);
      next();
    } else { 
      res.status(400).send([{message:"update user failed"}])
    }
  } catch (error) {
    next(error)
  }
}
async function getUserFullInfoById(req, res, next) {
  try {
    const userId = req.params.id;
    const userInfo = await usersModel.getUserFullInfoById(userId);
    if (userInfo) {
      res.send(userInfo);
      next();
    } 
  } catch (error) {
    next(error);
  }
}
 
export default {
  getUsers,
  addOrCancelAdmin,
  getUserById,
  updateUserById,
  getUserFullInfoById
};
