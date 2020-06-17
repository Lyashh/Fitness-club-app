import { Router as ExpressRouter } from "express";
import RequestValidation from "../middleware/requestValidation.middleware";
import ExerciseController from "../controllers/exercise.controller";
import AuthorizeMiddleware from "../middleware/authorize.middleware";

export default class ExerciseRouter {
  private router: ExpressRouter;
  private exerciseController: ExerciseController;
  private requestValidation: RequestValidation;
  private authorizeMiddleware: AuthorizeMiddleware;

  constructor() {
    this.exerciseController = new ExerciseController();
    this.requestValidation = new RequestValidation();
    this.authorizeMiddleware = new AuthorizeMiddleware();
    this.router = ExpressRouter();
  }

  public get routes(): ExpressRouter {
    this.router.get("/", this.exerciseController.getAllExercises());
    this.router.post(
      "/",
      this.authorizeMiddleware.isAuth(),
      this.authorizeMiddleware.isCoach(),
      this.requestValidation.validateNewExercise(),
      this.exerciseController.newExercise()
    );
    this.router.delete(
      "/",
      this.authorizeMiddleware.isAuth(),
      this.authorizeMiddleware.isCoach(),
      this.requestValidation.validateBodyId(),
      this.exerciseController.deleteExercise()
    );
    this.router.patch(
      "/",
      this.authorizeMiddleware.isAuth(),
      this.authorizeMiddleware.isCoach(),
      this.requestValidation.validateModifiedExercise(),
      this.exerciseController.updateExercise()
    );
    return this.router;
  }
}
