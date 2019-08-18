import jwt from "jsonwebtoken";

const createJWT = userId => {
  const token = jwt.sign(
    {
      id: userId
    },
    process.env.JWT_TOKEN || ""
  );
  return token;
};

export default createJWT;
