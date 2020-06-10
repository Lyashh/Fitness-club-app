import { Router as ExpressRouter } from "express";
import ProgramRouter from "./program.router";

export default class Router {
  private router: ExpressRouter;
  private programRouter: ProgramRouter;

  constructor() {
    this.router = ExpressRouter();
    this.programRouter = new ProgramRouter();
  }

  public get routes(): ExpressRouter {
    this.router.use("/program", this.programRouter.routes);
    return this.router;
  }
}
