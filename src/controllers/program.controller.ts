import { Response, Request } from "express";
import ProgramService from "../services/db/program.service";

export default class ProgramController {
  private programService: ProgramService;
  constructor() {
    this.programService = new ProgramService();
  }

  public getProgramById() {
    return (req: Request, res: Response) => {
      const program = this.programService.getProgramById(req.body.id);
      return res.json(program);
    };
  }

  public getAllPrograms() {
    return (req: Request, res: Response) => {
      const programs = this.programService.getAllPrograms();
      return res.json(programs);
    };
  }

  public deleteProgram() {
    return (req: Request, res: Response) => {
      const deleteResponse = this.programService.deleteProgram(req.body.id);
      if (deleteResponse)
        return res.json({
          message: `Program with id: ${req.body.id} has been deleted`,
        });
    };
  }

  public updateProgram() {
    return (req: Request, res: Response) => {
      const updatedProgram = this.programService.updateProgram(req.body.id, {});
      return res.json(updatedProgram);
    };
  }

  public createProgram() {
    return (req: Request, res: Response) => {
      const createdProgram = this.programService.createProgram({});
      return res.status(201).json(createdProgram);
    };
  }
}
