import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

/**
 * Generate JWT token for a user
 * @param {object} payload - Data to sign (usually { id, role })
 * @returns JWT token string
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

/**
 * Verify JWT token
 * @param {string} token
 * @returns decoded token data
 */
export const verifyToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};
