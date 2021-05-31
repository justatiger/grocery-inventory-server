import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, "SamuelGrocery", {
    expiresIn: "30d",
  });
};

export default generateToken;
