import { Router as ExpressRouter } from "express";
import ProgramController from "../controllers/program.controller";
import ValidationMiddleware from "../middleware/validation.middleware";

export default class ProgramRouter {
  private router: ExpressRouter;
  private programController: ProgramController;
  private validationMiddleware: ValidationMiddleware;

  constructor() {
    this.programController = new ProgramController();
    this.validationMiddleware = new ValidationMiddleware();
    this.router = ExpressRouter();
  }

  public get routes(): ExpressRouter {
    this.router.get("/", this.programController.getAllPrograms());
    this.router.get("/:id", this.programController.getProgramById());
    this.router.post(
      "/",
      this.validationMiddleware.validateNewProgram(),
      this.programController.createProgram()
    );
    this.router.delete(
      "/",
      this.validationMiddleware.validateBodyId(),
      this.programController.deleteProgram()
    );
    this.router.patch(
      "/",
      this.validationMiddleware.validateBodyId(),
      this.validationMiddleware.validateModifiedProgram(),
      this.programController.updateProgram()
    );

    return this.router;
  }
}
