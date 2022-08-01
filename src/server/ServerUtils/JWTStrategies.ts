// JWTStrategies
import * as passport from "passport";
import * as PassportJWT from "passport-jwt";
import * as PassportLocal from "passport-local";
import { MongoQuery } from "../mongodb";
import * as Types from "../../../Types";
import * as CONFIG from "../config";
import { Application } from "express";
import { compareHash } from "./Passwords";

export function configurePassport(app: Application) {
  passport.serializeUser((user: Types.IPlayerPayload, done) => {
    if (user.password) delete user.password;
    done(null, user);
  });

  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });

  // Logging in => authenticate("local") Middleware
  passport.use(
    new PassportLocal.Strategy(
      {
        usernameField: "username",
        session: false,
      },
      async (username, password, done) => {
        try {
          // query the DB for a player with the given username
          let res = await MongoQuery.getPlayerInfo(username);
          // if a response is returned, the player's username exists
          // console.log({ res });
          let playerInfo = res;
          // check if the provided password matches the hashedPassword from the DB
          if (res && compareHash(password, playerInfo.password!)) {
            // if so, remove it from the playerInfo, and call done, passing forward the playerInfo
            delete playerInfo.password;
            done(null, playerInfo);
          } else {
            done(null, false);
          }
        } catch (error) {
          // done(error);
          done(null, false);
        }
      }
    )
  );

  // Validate token => authenticate("jwt") Middleware to protect routes
  passport.use(
    new PassportJWT.Strategy(
      {
        jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: CONFIG.JWT_CONFIG.jwtSecretKey,
      },
      (payload: Types.IPlayerPayload, done) => {
        try {
          done(null, payload);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
  app.use(passport.initialize()); // initialize passport so that we can use its middleware
}
