const addPetSchema = {
  type: "object",
  properties: {
    type: {
      type: "string",
      enum: ["Dog", "Cat", "Fish", "Turtle", "Hamster", "Other"],
    },
    name: { type: "string" },
    adoptionStatus: {
      type: "string",
      enum: ["Adopted", "Fostered", "Available", "Other"],
    },
    // picture: { type: "string" },
    breed: { type: "string" },
    height: { type: "string" },
    weight: { type: "string" },
    color: { type: "string" },
    bio: { type: "string" },
    hypoallergenic: { type: "boolean" },
    dietary: { type: "string" },
    ownerId: { type: "integer" },
  },
  required: ["type", "name", "adoptionStatus"],
  additionalProperties: false,
  errorMessage: {
    properties: {
      type: "Type is required!",
      name: "Name is required!",
      adoptionStatus:"Adoption Status is required!"
    },
  },
};

const searchPetsSchema = {
  type: "object",
  properties: {
    type: {
      type: "string",
      enum: ["", "Dog", "Cat", "Fish", "Turtle", "Hamster", "Other"],
    },
    name: { type: "string" },
    adoptionStatus: {
      type: "string",
      enum: ["", "Adopted", "Fostered", "Available", "Other"],
    },
    minHeight: { type: "string" },
    maxHeight: { type: "string" },
    minWeight: { type: "string" },
    maxWeight: { type: "string" },
  },
  required: [],
  additionalProperties: false,
};


export { addPetSchema, searchPetsSchema};
