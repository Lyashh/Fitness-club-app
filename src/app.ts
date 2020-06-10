import express, { Response, Request, NextFunction } from "express";

class App {
  private static app: App;
  private expressApp: express.Application;

  private constructor() {
    this.expressApp = express();
    this.config();
  }

  private config(): void {
    this.expressApp.set("port", process.env.PORT || 4000);

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
