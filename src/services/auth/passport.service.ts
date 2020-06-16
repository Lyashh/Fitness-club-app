import bcrypt from "bcrypt";
import passportjs from "passport";
import { Response, Request, NextFunction } from "express";
import { Strategy as LocalStrategy } from "passport-local";
import CustomError from "../../types/errors/customError.types";
import UserService from "../db/user.service";
import User from "../../db/entity/user.entity";

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

    this.passport.serializeUser((user: User, done: any) => {
      return UserService.getUserById(user.id)
        .then((user: User) => {
          done(null, user);
        })
        .catch((e) => {
          return done(null, null, {
            message: `User with id: ${user.id} not found`,
            httpStatus: 401,
          });
        });
    });

    this.passport.deserializeUser((user: User, done: any) => {
      done(null, user);
    });
  }

  private localVerifyHandler = (
    req: any,
    email: string,
    password: string,
    done: any
  ) => {
    return UserService.getUserByEmail(email).then((user) => {
      if (user) {
        return bcrypt
          .compare(password, user.password)
          .then((result) => {
            if (result) {
              return done(false, user, false);
            }
            return done(null, null, {
              message: `Wrong password to auth by user with email: ${email}`,
              httpStatus: 401,
            });
          })
          .catch((e) => {
            return done(null, null, {
              message: e,
              httpStatus: 500,
            });
          });
      }
      return done(null, null, {
        message: `User with email: ${email} not found`,
        httpStatus: 404,
      });
    });
  };

  public localMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      this.passport.authenticate("local", (err: any, user: any, info: any) => {
        req.logIn(user, function (err) {
          if (err || info) {
            const error = new CustomError(info.message, info.httpStatus);
            return next(error);
          }
          return res.redirect("profile");
        });
      })(req, res, next);
    };
  }

  public static get getInstance(): Auth {
    return this.instance || (this.instance = new this());
  }
}
