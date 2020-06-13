import { Router as ExpressRouter } from "express";
import UserController from "../controllers/user.controller";
import ValidationMiddleware from "../middleware/validation.middleware";

export default class UserRouter {
  private router: ExpressRouter;
  private userController: UserController;
  private validationMiddleware: ValidationMiddleware;

  constructor() {
    this.userController = new UserController();
    this.validationMiddleware = new ValidationMiddleware();
    this.router = ExpressRouter();
  }

  public get routes(): ExpressRouter {
    this.router.get("/", this.userController.getAllUsers());
    this.router.get(
      "/:id",
      this.validationMiddleware.paramsIsNumber(["id"]),
      this.userController.getUserById()
    );
    this.router.post(
      "/",
      this.validationMiddleware.validateNewUser(),
      this.userController.createUser()
    );
    this.router.delete(
      "/",
      this.validationMiddleware.validateBodyId(),
      this.userController.deleteUser()
    );

    this.router.patch(
      "/",
      this.validationMiddleware.validateBodyId(),
      this.validationMiddleware.validateModifiedUser(),
      this.userController.updateUser()
    );

    this.router.patch(
      "/participateInProgram",
      this.validationMiddleware.validateBodyId(),
      this.userController.addProgramToUser()
    );

    return this.router;
  }
}
