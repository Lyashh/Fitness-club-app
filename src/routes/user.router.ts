import { Router as ExpressRouter } from "express";
import UserController from "../controllers/user.controller";
import RequestValidation from "../middleware/requestValidation.middleware";

export default class UserRouter {
  private router: ExpressRouter;
  private userController: UserController;
  private requestValidation: RequestValidation;

  constructor() {
    this.userController = new UserController();
    this.requestValidation = new RequestValidation();
    this.router = ExpressRouter();
  }

  public get routes(): ExpressRouter {
    this.router.get("/", this.userController.getAllUsers());
    this.router.get(
      "/:id",
      this.requestValidation.paramsIsNumber(["id"]),
      this.userController.getUserById()
    );
    this.router.post(
      "/",
      this.requestValidation.validateNewUser(),
      this.userController.createUser()
    );
    this.router.delete(
      "/",
      this.requestValidation.validateBodyId(),
      this.userController.deleteUser()
    );

    this.router.patch(
      "/",
      this.requestValidation.validateBodyId(),
      this.requestValidation.validateModifiedUser(),
      this.userController.updateUser()
    );

    this.router.patch(
      "/assignProgram",
      this.requestValidation.validateBodyId(),
      this.userController.assignProgramToUser()
    );

    this.router.patch(
      "/unassignProgram",
      this.requestValidation.validateBodyId(),
      this.userController.unassignProgramToUser()
    );

    return this.router;
  }
}
