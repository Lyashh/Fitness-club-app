import { Router as ExpressRouter } from "express";
import ProgramController from "../controllers/program.controller";
import RequestValidation from "../middleware/requestValidation.middleware";
import DBValidationMiddleware from "../middleware/dbValidation.middleware";
import AuthorizeMiddleware from "../middleware/authorize.middleware";

export default class ProgramRouter {
  private router: ExpressRouter;
  private programController: ProgramController;
  private requestValidation: RequestValidation;
  private dbValidation: DBValidationMiddleware;
  private authorizeMiddleware: AuthorizeMiddleware;

  constructor() {
    this.programController = new ProgramController();
    this.requestValidation = new RequestValidation();
    this.dbValidation = new DBValidationMiddleware();
    this.authorizeMiddleware = new AuthorizeMiddleware();
    this.router = ExpressRouter();
  }

  public get routes(): ExpressRouter {
    this.router.get("/", this.programController.getAllPrograms());
    this.router.get(
      "/:id",
      this.authorizeMiddleware.isAuth(),
      this.dbValidation.programBelongsToUser(),
      this.programController.getProgramById()
    );

    this.router.post(
      "/",
      this.authorizeMiddleware.isAuth(),
      this.requestValidation.validateNewProgram(),
      this.programController.createProgram()
    );

    this.router.delete(
      "/",
      this.authorizeMiddleware.isAuth(),
      this.requestValidation.validateBodyId(),
      this.authorizeMiddleware.programBelongsToCoach(),
      this.programController.deleteProgram()
    );

    this.router.patch(
      "/",
      this.authorizeMiddleware.isAuth(),
      this.authorizeMiddleware.programBelongsToCoach(),
      this.requestValidation.validateModifiedProgram(),
      this.programController.updateProgram()
    );

    this.router.patch(
      "/addExercises",
      this.authorizeMiddleware.isAuth(),
      this.requestValidation.validateAddOrRemoveExerciseToProgram(),
      this.authorizeMiddleware.programBelongsToCoach(),
      this.dbValidation.validateExercisesExist(),
      this.programController.addExercisesToProgram()
    );
    this.router.patch(
      "/removeExercises",
      this.authorizeMiddleware.isAuth(),
      this.requestValidation.validateAddOrRemoveExerciseToProgram(),
      this.authorizeMiddleware.programBelongsToCoach(),
      this.dbValidation.validateProgramHaveErxercises(),
      this.programController.removeExercisesFromProgram()
    );

    return this.router;
  }
}
