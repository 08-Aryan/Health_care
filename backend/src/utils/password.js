import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

/**
 * Hash user password before storing in DB
 * @param {string} password
 * @returns hashed password
 */
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compare plain password with hashed password
 * @param {string} password
 * @param {string} hashedPassword
 * @returns boolean
 */
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
