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
  passport.serializeUser((user, done) => {
    if (user.password) delete user.password;
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // Logging in => authenticate("local") Middleware
  passport.use(
    new PassportLocal.Strategy(
      {
        usernameField: "email",
        session: false,
      },
      async (email, password, done) => {
        try {
          const [userFound, metaData] = await DB.Users.getSingleUserAUTH(email);
          if (userFound.length && compareHash(password, userFound[0].password)) {
            delete userFound[0].password;
            done(null, userFound);
          } else {
            done(null, false);
          }
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
