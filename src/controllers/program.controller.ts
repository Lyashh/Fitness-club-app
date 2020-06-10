import { Response, Request } from "express";
import ProgramService from "../services/db/program.service";

export default class ProgramController {
  private programService: ProgramService;
  constructor() {
    this.programService = new ProgramService();
  }

  public getProgramById() {
    return async (req: Request, res: Response) => {
      const program = await this.programService.getProgramById(req.body.id);
      return res.json(program);
    };
  }

  public getAllPrograms() {
    return async (req: Request, res: Response) => {
      const programs = await this.programService.getAllPrograms();
      return res.json(programs);
    };
  }

  public deleteProgram() {
    return async (req: Request, res: Response) => {
      const deleteResponse = await this.programService.deleteProgram(
        req.body.id
      );
      if (deleteResponse)
        return res.json({
          message: `Program with id: ${req.body.id} has been deleted`,
        });
    };
  }

  public updateProgram() {
    return async (req: Request, res: Response) => {
      const updatedProgram = await this.programService.updateProgram(
        req.body.id,
        {}
      );
      return res.json(updatedProgram);
    };
  }

  public createProgram() {
    return async (req: Request, res: Response) => {
      const createdProgram = await this.programService.createProgram({});
      return res.status(201).json(createdProgram);
    };
  }
}
