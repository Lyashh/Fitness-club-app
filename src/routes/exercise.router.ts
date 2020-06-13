import { Router as ExpressRouter } from "express";
import ValidationMiddleware from "../middleware/validation.middleware";
import ExerciseController from "../controllers/exercise.controller";

export default class ExerciseRouter {
  private router: ExpressRouter;
  private exerciseController: ExerciseController;
  private validationMiddleware: ValidationMiddleware;

  constructor() {
    this.exerciseController = new ExerciseController();
    this.validationMiddleware = new ValidationMiddleware();
    this.router = ExpressRouter();
  }

  public get routes(): ExpressRouter {
    this.router.get("/", this.exerciseController.getAllExercises());
    return this.router;
  }
}
