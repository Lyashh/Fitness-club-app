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
    return async (req: Request, res: Response) => {
      const user = await this.userService.getUserById(parseInt(req.params.id));
      if (user) {
        return res.json(user);
      } else {
        return res
          .status(404)
          .json({ message: `User with id: ${req.params.id} not found` });
      }
    };
  }

  public createUser() {
    return async (req: Request, res: Response, next: NextFunction) => {
      this.userService
        .createUser(req.body)
        .then((newUser) => res.json({ newUser }))
        .catch((e) => {
          let error = new CustomError(e.message, "db", e.code);
          return next(error);
        });
    };
  }
}
