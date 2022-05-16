const userSignUpSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 3 },
    // rePassword: { type: "string", minLength: 3 },
    firstName: { type: "string" },
    lastName: { type: "string" },
    phoneNumber: { type: "string" },
  },
  required: ["email", "password", "firstName", "lastName", "phoneNumber"],
  additionalProperties: false,
  errorMessage: {
    properties: {
      email: "Invalid email format!",
      password: "Password must contain at least 3 characters!",
      phoneNumber: "Phone number must be numbers!"
    },
  },
};

const userLoginSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 3 },
  },
  required: ["email", "password"],
  additionalProperties: false,
  errorMessage: {
    properties: {
      email: "Invalid email format!",
      password: "Password must contain at least 3 characters!",
    },
  },
};

const userProfileSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 3 },
    firstName: { type: "string" },
    lastName: { type: "string" },
    phoneNumber: { type: "string" },
    bio: { type: "string" },
  },
  required: [],
  additionalProperties: false,
  errorMessage: {
    properties: {
      email: "Invalid email format!",
      password: "Password must contain at least 3 characters!",
    },
  },
};



export { userLoginSchema, userSignUpSchema, userProfileSchema };
