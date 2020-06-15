import { Response, Request, NextFunction } from "express";
import passportjs from "passport";
import { Strategy as LocalStrategy } from "passport-local";

export default class Auth {
  private static instance: Auth;
  public passport: any;
  public localStrategy: LocalStrategy;

  private constructor() {
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
    this.passport.use(this.localStrategy);
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
    done(null, { id: 20, name: "name", email });
  };

  public get localMiddleware() {
    return this.passport.authenticate("local", {
      failureRedirect: "login/callback",
    });
  }

  public static get getInstance(): Auth {
    return this.instance || (this.instance = new this());
  }
}
