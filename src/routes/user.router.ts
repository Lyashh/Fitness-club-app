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
      "/athletes",
      this.authorizeMiddleware.isAuth(),
      this.authorizeMiddleware.isCoach(),
      this.userController.getAthletes()
    );

    this.router.get(
      "/:id/oneCoachPrograms",
      this.authorizeMiddleware.isAuth(),
      this.authorizeMiddleware.isCoach(),
      this.requestValidation.paramsIsNumber(["id"]),
      this.userController.oneCoachPrograms()
    );

    this.router.get(
      "/:id",
      this.authorizeMiddleware.isAuth(),
      this.authorizeMiddleware.isCoach(),
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
      this.userController.deleteUser()
    );

    this.router.patch(
      "/",
      this.authorizeMiddleware.isAuth(),
      this.requestValidation.validateModifiedUser(),
      this.userController.updateUser()
    );

    this.router.patch(
      "/assignProgram",
      this.authorizeMiddleware.isAuth(),
      this.requestValidation.validateAssignAndUnProgramToUser(),
      this.authorizeMiddleware.isCoach(),
      this.userController.assignProgramToUser()
    );

    this.router.patch(
      "/unAssignProgram",
      this.authorizeMiddleware.isAuth(),
      this.requestValidation.validateAssignAndUnProgramToUser(),
      this.authorizeMiddleware.isCoach(),
      this.userController.unAssignProgramToUser()
    );

    return this.router;
  }
}
