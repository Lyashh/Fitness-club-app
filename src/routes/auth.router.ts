import { Router as ExpressRouter } from "express";
import AuthController from "../controllers/auth.controller";
import AuthService from "../services/auth/passport.service";
import RequestValidation from "../middleware/requestValidation.middleware";
import AuthorizeMiddleware from "../middleware/authorize.middleware";

const Passportjs = AuthService.getInstance;

export default class AuthRouter {
  private router: ExpressRouter;
  private requestValidation: RequestValidation;
  private authController: AuthController;
  private authorizeMiddleware: AuthorizeMiddleware;

  constructor() {
    this.authController = new AuthController();
    this.requestValidation = new RequestValidation();
    this.authorizeMiddleware = new AuthorizeMiddleware();
    this.router = ExpressRouter();
  }

  public get routes(): ExpressRouter {
    this.router.post(
      "/login",
      this.authorizeMiddleware.notAuth(),
      this.requestValidation.validateLogin(),
      Passportjs.localMiddleware(),
      this.authController.profile()
    );

    this.router.get(
      "/profile",
      this.authorizeMiddleware.isAuth(),
      this.authController.profile()
    );

    this.router.get(
      "/profile/programs",
      this.authorizeMiddleware.isAuth(),
      this.authController.getProgramsByRole()
    );

    this.router.get(
      "/profile/users",
      //this.authorizeMiddleware.isAuth(),
      this.authController.getUsersByPrograms()
    );

    this.router.post(
      "/registration",
      this.authorizeMiddleware.notAuth(),
      this.authController.registration()
    );

    this.router.post(
      "/logout",
      this.authorizeMiddleware.isAuth(),
      this.authController.logout()
    );
    return this.router;
  }
}
