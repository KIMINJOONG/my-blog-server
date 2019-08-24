import bcrypt from "bcrypt";
const BCRYPT_ROUNDS = 10;
export const savePassword = async password => {
  if (password) {
    const hashedPassword = await hashPassword(password);
    return hashedPassword;
  }
};

const hashPassword = password => {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
};

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
