import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as config from "../config";

// Returns a hased password from the plaintextPassword
export function generateHash(plaintextPassword: string) {
  const saltRounds = 12;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(plaintextPassword, salt);
  return hash;
}

// Returns a Boolean as the result of comparing a plaintextPassword against the hashedPassword
export function compareHash(plaintextPassword: string, hashedPassword: string) {
  return bcrypt.compareSync(plaintextPassword, hashedPassword);
}

// Returns a signed JWT
export function generateToken(userid: number, email: string, name: string) {
  const token = jwt.sign({ userid, email, role: "guest", name }, config.JWT_CONFIG.jwtSecretKey, {
    expiresIn: config.JWT_CONFIG.jwtExpireTime,
  });
  return token;
}
