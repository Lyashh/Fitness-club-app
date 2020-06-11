import { Router as ExpressRouter } from "express";
import UserController from "../controllers/user.controller";
export default class UserRouter {
  private router: ExpressRouter;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = ExpressRouter();
  }

  public get routes(): ExpressRouter {
    this.router.get("/", this.userController.getAllUsers());
    this.router.get("/:id", this.userController.getUserById());
    this.router.post("/", this.userController.createUser());

    return this.router;
  }
}
