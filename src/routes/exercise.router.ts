import { Router as ExpressRouter } from "express";
import RequestValidation from "../middleware/requestValidation.middleware";
import ExerciseController from "../controllers/exercise.controller";

export default class ExerciseRouter {
  private router: ExpressRouter;
  private exerciseController: ExerciseController;
  private requestValidation: RequestValidation;

  constructor() {
    this.exerciseController = new ExerciseController();
    this.requestValidation = new RequestValidation();
    this.router = ExpressRouter();
  }

  public get routes(): ExpressRouter {
    this.router.get("/", this.exerciseController.getAllExercises());
    this.router.post(
      "/",
      this.requestValidation.validateNewExercise(),
      this.exerciseController.newExercise()
    );
    this.router.delete(
      "/",
      this.requestValidation.validateBodyId(),
      this.exerciseController.deleteExercise()
    );
    this.router.patch(
      "/",
      this.requestValidation.validateModifiedExercise(),
      this.exerciseController.updateExercise()
    );
    return this.router;
  }
}
