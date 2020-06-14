import { Router as ExpressRouter } from "express";
import ProgramController from "../controllers/program.controller";
import RequestValidation from "../middleware/requestValidation.middleware";

export default class ProgramRouter {
  private router: ExpressRouter;
  private programController: ProgramController;
  private requestValidation: RequestValidation;

  constructor() {
    this.programController = new ProgramController();
    this.requestValidation = new RequestValidation();
    this.router = ExpressRouter();
  }

  public get routes(): ExpressRouter {
    this.router.get("/", this.programController.getAllPrograms());
    this.router.get("/:id", this.programController.getProgramById());
    this.router.post(
      "/",
      this.requestValidation.validateNewProgram(),
      this.programController.createProgram()
    );
    this.router.delete(
      "/",
      this.requestValidation.validateBodyId(),
      this.programController.deleteProgram()
    );
    this.router.patch(
      "/",
      this.requestValidation.validateBodyId(),
      this.requestValidation.validateModifiedProgram(),
      this.programController.updateProgram()
    );
    this.router.patch(
      "/addExercises",
      this.requestValidation.validateAddOrRemoveExerciseToProgram(),
      this.programController.addExercisesToProgram()
    );
    this.router.patch(
      "/removeExercises",
      this.requestValidation.validateAddOrRemoveExerciseToProgram(),
      this.programController.removeExercisesFromProgram()
    );

    return this.router;
  }
}
