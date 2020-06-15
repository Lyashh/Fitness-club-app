import express, { Response, Request, NextFunction } from "express";
import bodyParser from "body-parser";
import session from "express-session";
import doenv from "dotenv";

import ErrorHandler from "./services/handlers/error.handler";
import Router from "./routes/index.router";
import AuthService from "./services/auth/passport.service";

doenv.config();

export default class App {
  private static app: App;
  private expressApp: express.Application;
  private router: Router;
  private authService: AuthService;

  private constructor() {
    this.expressApp = express();
    this.authService = new AuthService();
    this.router = new Router();
    this.config();
  }

  private config(): void {
    this.expressApp.use(
      session({
        secret: process.env.SESSION_SECRET || "secret",
        name: "fitnes-app-session",
        resave: false,
        saveUninitialized: true,
      })
    );
    this.expressApp.set("port", process.env.PORT || 4000);
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: true }));

    this.expressApp.use(this.authService.passport.initialize());
    this.expressApp.use(this.authService.passport.session());

    this.expressApp.use("/api/", this.router.routes);

    this.expressApp.use(ErrorHandler.getHandler);

    // 404
    this.expressApp.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404);
      return res.json({
        error: `Not found${req.originalUrl}`,
      });
    });
  }

  public init(): void {
    this.expressApp.listen(this.expressApp.get("port"), () => {
      console.log(`SERVER RUN ON PORT ${this.expressApp.get("port")}`);
    });
  }

  public static get getInstance(): App {
    const app: App = this.app || (this.app = new this());
    return app;
  }
}
