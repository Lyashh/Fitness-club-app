import { Router as ExpressRouter } from "express";
import AuthController from "../controllers/auth.controller";
import AuthService from "../services/auth/passport.service";
import RequestValidation from "../middleware/requestValidation.middleware";

const Passportjs = AuthService.getInstance;

export default class AuthRouter {
  private router: ExpressRouter;
  private requestValidation: RequestValidation;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.requestValidation = new RequestValidation();
    this.router = ExpressRouter();
  }

  public get routes(): ExpressRouter {
    this.router.post(
      "/login",
      this.requestValidation.validateLogin(),
      Passportjs.localMiddleware,
      this.authController.profile()
    );

    this.router.get("/login/callback", this.authController.localCallback());
    this.router.get("/profile", this.authController.profile());

    this.router.post("/registration", this.authController.registration());

    this.router.post("/logout", this.authController.logout());
    return this.router;
  }
}
