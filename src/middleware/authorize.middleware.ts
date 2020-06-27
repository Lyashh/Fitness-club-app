import { Response, Request, NextFunction } from "express";
import CustomError from "../types/errors/customError.types";
import User from "../db/entity/user.entity";
import ProgramService from "../services/db/program.service";

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
    return (req: Request, res: Response, next: NextFunction) => {
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

  public modifyAccessById() {
    return (
      req: Request,
      res: Response,
      next: NextFunction
    ): void | Response => {
      if (req.session!.passport.user.id === req.body.id) {
        return next();
      }
      const error = new CustomError(
        `You dont have permissions to modify this resource by your id: ${
          req.session!.passport.user.id
        }`,
        403
      );
      return next(error);
    };
  }

  public programBelongsToCoach() {
    return (req: Request, res: Response, next: NextFunction) => {
      return ProgramService.getProgramById(req.body.id)
        .then((program) => {
          if (program.coach.id === req.session!.passport.user.id) {
            return next();
          }
          const error = new CustomError(
            `You dont have permissions to modify this program with id: ${req.body.id}`,
            403
          );
          return next(error);
        })
        .catch((e) => {
          if (e.httpStatus) {
            const error = new CustomError(e.message, e.httpStatus);
            return next(error);
          }
          const error = new CustomError(e.message, null, e.code);
          return next(error);
        });
    };
  }
}
