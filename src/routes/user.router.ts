import { Router as ExpressRouter } from "express";
import UserController from "../controllers/user.controller";
import RequestValidation from "../middleware/requestValidation.middleware";
import AuthorizeMiddleware from "../middleware/authorize.middleware";

export default class UserRouter {
  private router: ExpressRouter;
  private userController: UserController;
  private requestValidation: RequestValidation;
  private authorizeMiddleware: AuthorizeMiddleware;

  constructor() {
    this.userController = new UserController();
    this.requestValidation = new RequestValidation();
    this.authorizeMiddleware = new AuthorizeMiddleware();
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
      this.authorizeMiddleware.isAuth(),
      this.requestValidation.validateBodyId(),
      this.authorizeMiddleware.modifyAccessById(),
      this.userController.deleteUser()
    );

    this.router.patch(
      "/",
      this.authorizeMiddleware.isAuth(),
      this.requestValidation.validateBodyId(),
      this.authorizeMiddleware.modifyAccessById(),
      this.requestValidation.validateModifiedUser(),
      this.userController.updateUser()
    );

    this.router.patch(
      "/assignProgram",
      this.authorizeMiddleware.isAuth(),
      this.requestValidation.validateBodyId(),
      this.authorizeMiddleware.isCoach(),
      this.userController.assignProgramToUser()
    );

    this.router.patch(
      "/unassignProgram",
      this.authorizeMiddleware.isAuth(),
      this.requestValidation.validateBodyId(),
      this.authorizeMiddleware.isCoach(),
      this.userController.unassignProgramToUser()
    );

    return this.router;
  }
}
