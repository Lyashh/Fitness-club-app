import { Router as ExpressRouter } from "express";
import ProgramRouter from "./program.router";
import UserRouter from "./user.router";
export default class Router {
  private router: ExpressRouter;
  private programRouter: ProgramRouter;
  private userRouter: UserRouter;

  constructor() {
    this.router = ExpressRouter();
    this.programRouter = new ProgramRouter();
    this.userRouter = new UserRouter();
  }

  public get routes(): ExpressRouter {
    this.router.use("/program", this.programRouter.routes);
    this.router.use("/user", this.userRouter.routes);
    return this.router;
  }
}
