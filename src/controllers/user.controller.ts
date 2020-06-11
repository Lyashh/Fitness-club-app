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
}
