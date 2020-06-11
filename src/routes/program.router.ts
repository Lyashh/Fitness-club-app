import { Router as ExpressRouter } from "express";
import ProgramController from "../controllers/program.controller";

export default class ProgramRouter {
  private router: ExpressRouter;
  private programController: ProgramController;

  constructor() {
    this.programController = new ProgramController();
    this.router = ExpressRouter();
  }

  public get routes(): ExpressRouter {
    this.router.get("/", this.programController.getAllPrograms());
    this.router.get("/:id", this.programController.getProgramById());
    this.router.post("/", this.programController.createProgram());
    this.router.delete("/", this.programController.deleteProgram());
    this.router.patch("/", this.programController.updateProgram());

    return this.router;
  }
}
