import * as dotenv from "dotenv";
dotenv.config();

export const JWT_CONFIG = { jwtSecretKey: process.env.JWT_SECRET_KEY };

export const DB_CONFIG = { password: process.env.MONGO_PASSWORD };

/**
 *This is how we hide the database access info, while still being able to use it
 */
