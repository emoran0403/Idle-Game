// JWTStrategies
import * as passport from "passport";
import * as PassportJWT from "passport-jwt";
import * as PassportLocal from "passport-local";
import { MongoQuery } from "../mongodb";
import * as Types from "../../../Types";
import * as CONFIG from "../config";
import { Application } from "express";
import { compareHash } from "./Passwords";

//! need help with this lol

export function configurePassport(app: Application) {
  passport.serializeUser((user: Types.IPlayerData, done) => {
    if (user.password) delete user.password;
    done(null, user);
  });

  passport.deserializeUser((user: Types.IPlayerData, done) => {
    done(null, user);
  });

  // Logging in => authenticate("local") Middleware
  passport.use(
    new PassportLocal.Strategy(
      {
        //! do i swap email here to username since i want to login with a username + password combo?
        usernameField: "email",
        session: false,
      },
      async (username, password, done) => {
        try {
          // query the DB for a player with the given username
          MongoQuery.getPlayerInfo(username).then((res) => {
            // if a response is returned, the player's username exists
            if (res) {
              //! probably a better way to do this
              // this lets us assert that playerInfo is of the correct type.
              let playerInfo = JSON.parse(JSON.stringify(res)) as Types.IPlayerData;
              // check if the provided password matches the hashedPassword from the DB
              if (compareHash(password, playerInfo.password!)) {
                // if so, remove it from the playerInfo, and call done, passing forward the playerInfo
                delete playerInfo.password;
                done(null, playerInfo);
              } else {
                done(null, false);
              }
            }
          });
        } catch (error) {
          done(error);
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
      (payload: Types.Payload, done) => {
        try {
          done(null, payload);
        } catch (error) {}
      }
    )
  );
  app.use(passport.initialize()); // initialize passport so that we can use its middleware
}
