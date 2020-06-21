import { Request, Response, NextFunction } from "express";
import UserService from "../services/db/user.service";
import CustomError from "../types/errors/customError.types";

export default class AuthController {
  public logout() {
    return (req: Request, res: Response) => {
      req.logout();
      return res.json({
        message: "Successfully logout",
      });
    };
  }

  public registration() {
    return (req: Request, res: Response, next: NextFunction) => {
      return res.redirect(307, "/api/users");
    };
  }

  public profile() {
    return (req: Request, res: Response, next: NextFunction) => {
      return res.json(req.user);
    };
  }

  public getProgramsByRole() {
    return (req: Request, res: Response, next: NextFunction) => {
      return UserService.getUserById(req.session!.passport.user.id, true)
        .then((user) => {
          if (req.session!.passport.user.role.name === "coach") {
            return res.json(user.coachPrograms);
          }
          return res.json(user.programs);
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

  public getUsersByPrograms() {
    return (req: Request, res: Response, next: NextFunction) => {
      return UserService.getUsersByPrograms([3, 16])
        .then((users) => {
          return res.json(users);
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
