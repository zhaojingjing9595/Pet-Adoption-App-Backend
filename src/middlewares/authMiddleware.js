import { appDB } from "../index.js";
import bcrypt from 'bcrypt';
import Ajv from "ajv";
import addFormat from "ajv-formats";
import ajvErrors from "ajv-errors";
import jwt from 'jsonwebtoken';
import { userLoginSchema, userSignUpSchema,userProfileSchema } from "../data/userSchema.js"; 

const ajv = new Ajv({allErrors:true});
addFormat(ajv);
ajvErrors(ajv);

const loginValidate = ajv.compile(userLoginSchema);
const signUpValidate = ajv.compile(userSignUpSchema);
const profileValidate = ajv.compile(userProfileSchema)

function userLoginValidate(req, res, next) {  
    try {
        const loginValid = loginValidate(req.body);
        console.log("loginValid:", loginValid);
        if (loginValid) {
            next();
        } else { 
            res
              .status(400)
              .send(loginValidate.errors);
        }
} catch (error) {
    next(error)
    console.log(error)
}
}

function userSignUpValidate(req, res, next) {
  try {
      const signUpValid = signUpValidate(req.body);
      console.log("signUpValid:",signUpValid);
    if (signUpValid) {
      next();
    } else {
      res.status(400).send(signUpValidate.errors);
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
}

function userProfileValidate(req, res, next) { 
try {
  const profileValid = profileValidate(req.body);
  console.log("profile change valid?", profileValid);
  if (profileValid) {
    next();
  } else { 
    res.status(400).send(profileValidate.errors);
  }
} catch (error) {
  next(error)
}
}

function noEmptyLoginFields(req, res, next) { 
    try {
        const {email, password } = req.body;
        if (!email || !password) {
          res.status(400).send([{message:"email or password missing"}]);
        } else {
          next();
        }      
    } catch (error) {
        next(error)
    }
}

function noEmptySignUpFields(req, res, next) {
  try {
    const { email, password, firstName, lastName, phoneNumber } =
      req.body;
    if (
      !email ||
      !password ||

      !firstName ||
      !lastName ||
      !phoneNumber
    ) {
      res.status(400).send([{message:"please complete all inputs"}]);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function uniqueEmail(req, res, next) { 
    try {
        const email = req.body.email;
        const user = await appDB.from('users').where({ email: email });
        if (user.length > 0) {
          res.status(409).send([{message:"This email address already exists"}]);
          return;
        } else { 
            console.log("creating a new user...")
            next();
        }
    } catch (error) {
        next(error)
  }
}

async function uniqueEmailProfileChange(req, res, next) {
  try {
    const userId = req.params.id;
    const newProfile = req.body;
    const oldProfile = await appDB.from("users").where({ userId }).first();
    if (oldProfile.email === newProfile.email) {
      next();
    } else { 
      const user = await appDB.from("users").where({ email: newProfile.email });
      if (user.length > 0) {
        res.status(409).send([{message: "This email address already exists!"}]);
        return;
      } else { 
        console.log("the email address is available!");
        next();
      }
    }
  } catch (error) {
    next(error)
  }
}

function checkRePasswordMatch(req, res, next) { 
    try {
        const password = req.body.password;
        const rePassword = req.body.rePassword;
        if (password !== rePassword) {
            res.status(400).send([{message: "inconsistent password!"}])
        } else { 
            console.log("password matched")
            next();
        }
    } catch (error) {
        next(error)
    }
}

async function encryptPassword(req, res, next) { 
    try {
        const saltRounds = 10;
        const myPlaintextPassword = req.body.password;
        const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
        req.body.hashPassword = hash;
        console.log("encrypting password")
        next();
    } catch (error) {
        next(error)
    }
}

async function encryptPasswordProfileChange(req, res,next) {
  try {
 const newProfile = req.body;
    if (newProfile.password) {
      const saltRounds = 10;
      const myPlaintextPassword = newProfile.password;
      const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
      newProfile.hashPassword = hash;
      console.log("encrypting password");
      next();
    }
    else { 
      next();
    }
  } catch (error) {
    next(error)
  }
}

function authenticated(req, res, next) {
  try {
    // const token = req.headers.authorization ? req.headers.authorization.replace("Bearer ", "") : null;
    const token = req.cookies.token;
    const authenticatedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = authenticatedUser;
    // console.log(authenticatedUser);
    next();
  } catch (error) {
    next(error)
  }
}

function isAdminCheck(req, res, next) {
  try {
    if (req.user.admin === 1) {
      next();
    } else { 
      res.send("You are not an admin, no access!");
      return;
    }
  } catch (error) {
     next(error);
  }
}

function isLoggedInUserReqParamsCheck(req, res, next) {
  // check if the userId of the token saved in the cookie is same with the request userId or if he's an admin.
  try {
    if (req.user.userId == req.params.id || req.user.admin === 1) {
      next();
    } else {
      res.send("No access");
      return;
    }
  } catch (error) {
    next(error);
  }
}

function isLoggedInUserReqBodyCheck(req, res, next) {
  try {
    if (req.user.userId == req.body.userId || req.user.admin === 1) {
      next();
    } else {
      res.send("No access");
      return;
    }
  } catch (error) {
    next(error);
  }
}


export default {
  noEmptyLoginFields,
  noEmptySignUpFields,
  userLoginValidate,
  userSignUpValidate,
  userProfileValidate,
  uniqueEmail,
  uniqueEmailProfileChange,
  checkRePasswordMatch,
  encryptPassword,
  encryptPasswordProfileChange,
  authenticated,
  isAdminCheck,
  isLoggedInUserReqParamsCheck,
  isLoggedInUserReqBodyCheck,
};