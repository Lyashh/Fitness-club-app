import { Response, Request } from "express";
import UserService from "../services/db/user.service";

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
}
