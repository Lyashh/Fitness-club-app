import express, { Response, Request, NextFunction } from "express";
import bodyParser from "body-parser";

import Router from "./routes/index.router";

class App {
  private static app: App;
  private expressApp: express.Application;
  private router: Router;

  private constructor() {
    this.expressApp = express();
    this.router = new Router();
    this.config();
  }

  private config(): void {
    this.expressApp.set("port", process.env.PORT || 4000);
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: true }));
    this.expressApp.use("/api/", this.router.routes);

    // 404
    this.expressApp.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404);
      return res.json({ error: `Not found${req.originalUrl}` });
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

const server = App.getInstance;
server.init();
