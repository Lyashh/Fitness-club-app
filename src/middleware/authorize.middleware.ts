import { Response, Request, NextFunction } from "express";
import CustomError from "../types/errors/customError.types";

export default class AuthorizeMiddleware {
  public isAuth() {
    return (
      req: Request,
      res: Response,
      next: NextFunction
    ): void | Response => {
      if (req.isAuthenticated()) {
        return next();
      }
      const error = new CustomError("You aren’t authenticated", 401);
      return next(error);
    };
  }

  public notAuth() {
    return (
      req: Request,
      res: Response,
      next: NextFunction
    ): void | Response => {
      if (!req.isAuthenticated()) {
        return next();
      }
      const error = new CustomError(
        "You cant access to this resource because you are authenticated",
        403
      );
      return next(error);
    };
  }

  public isCoach() {
    return (
      req: Request,
      res: Response,
      next: NextFunction
    ): void | Response => {
      if (req.session!.passport.user.role.name === "coach") {
        return next();
      }
      const error = new CustomError(
        `You dont have permissions to access this resource by ${
          req.session!.passport.user.role.name
        }`,
        403
      );
      return next(error);
    };
  }
}
