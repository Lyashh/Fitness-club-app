import { Response, Request, NextFunction } from "express";
import passportjs from "passport";
import { Strategy as LocalStrategy } from "passport-local";

export default class Auth {
  public passport: any;
  public localStrategy: LocalStrategy;

  constructor() {
    this.passport = passportjs;

    this.localStrategy = new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: true,
        passReqToCallback: true,
      },
      this.localVerifyHandler
    );

    this.passport.serializeUser((user: any, done: any) => {
      done(null, user);
    });

    this.passport.deserializeUser((user: any, done: any) => {
      done(null, user);
    });
  }

  private localVerifyHandler = (
    req: any,
    email: any,
    password: any,
    done: any
  ) => {
    done(null, {});
  };

  public get localMiddleware() {
    return this.passport.authenticate("local", {
      failureRedirect: "login/callback",
    });
  }
}
