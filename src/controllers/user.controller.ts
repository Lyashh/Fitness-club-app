import { Response, Request, NextFunction } from "express";
import UserService from "../services/db/user.service";
import User from "../db/entity/user.entity";
import CustomError from "../types/errors/customError.types";

export default class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  public getAllUsers() {
    return async (req: Request, res: Response) => {
      const users = await this.userService.getAllUsers();
      return res.json(users);
    };
  }

  public getUserById() {
    return (req: Request, res: Response, next: NextFunction) => {
      return this.userService
        .getUserById(parseInt(req.params.id))
        .then((user) => {
          return res.json(user);
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

  public createUser() {
    return async (req: Request, res: Response, next: NextFunction) => {
      this.userService
        .createUser(req.body)
        .then((newUser) => res.json({ newUser }))
        .catch((e) => {
          const error = new CustomError(e.message, null, e.code);
          return next(error);
        });
    };
  }

  public deleteUser() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const deleted = await this.userService.deleteUser(req.body.id);
      if (deleted) {
        return res.json({
          message: `User with id: ${req.body.id} has been successfully deleted`,
        });
      }
      const error = new CustomError(
        `User with id: ${req.body.id} not found`,
        404
      );
      return next(error);
    };
  }

  public updateUser() {
    return async (req: Request, res: Response, next: NextFunction) => {
      return this.userService
        .updateUser(req.body.id, req.body.newFields)
        .then((newUser) => {
          return res.json({ newUser });
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
