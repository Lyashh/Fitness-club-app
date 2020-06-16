import { Request, Response, NextFunction } from "express";
import UserService from "../services/db/user.service";
import CustomError from "../types/errors/customError.types";

export default class AuthController {
  public login() {
    return (req: Request, res: Response) => {
      res.json({
        message: req.session!.passport.user,
      });
    };
  }

  public logout() {
    return (req: Request, res: Response) => {
      req.logout();
      return res.json({
        message: "success logout",
      });
    };
  }

  public registration() {
    return (req: Request, res: Response, next: NextFunction) => {
      return res.redirect(307, "/api/users");
    };
  }

  public profile() {
    return (req: Request, res: Response) => {
      return res.json(req.session!.passport);
    };
  }
}
