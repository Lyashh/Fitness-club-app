import { Router as ExpressRouter } from "express";
import ProgramRouter from "./program.router";
import UserRouter from "./user.router";
import ExerciseRouter from "./exercise.router";

export default class Router {
  private router: ExpressRouter;
  private programRouter: ProgramRouter;
  private userRouter: UserRouter;
  private exerciseRouter: ExerciseRouter;

  constructor() {
    this.router = ExpressRouter();
    this.exerciseRouter = new ExerciseRouter();
    this.programRouter = new ProgramRouter();
    this.userRouter = new UserRouter();
  }

  public get routes(): ExpressRouter {
    this.router.use("/programs", this.programRouter.routes);
    this.router.use("/users", this.userRouter.routes);
    this.router.use("/exercises", this.exerciseRouter.routes);
    return this.router;
  }
}
