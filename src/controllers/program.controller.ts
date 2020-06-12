import { Response, Request, NextFunction } from "express";
import ProgramService from "../services/db/program.service";
import CustomError from "../types/errors/customError.types";

export default class ProgramController {
  private programService: ProgramService;
  constructor() {
    this.programService = new ProgramService();
  }

  public getProgramById() {
    return async (req: Request, res: Response, next: NextFunction) => {
      return this.programService
        .getProgramById(req.body.id)
        .then((program) => {
          return res.json(program);
        })
        .catch((e) => {
          if (e.httpStatus) {
            const error = new CustomError(e.message, e.httpStatus);
            return next(error);
          }
          const error = new CustomError(e.message, null, e.code);
          return next(error);
        });
    };
  }

  public getAllPrograms() {
    return async (req: Request, res: Response) => {
      const programs = await this.programService.getAllPrograms();
      return res.json(programs);
    };
  }

  public deleteProgram() {
    return async (req: Request, res: Response, next: NextFunction) => {
      return this.programService
        .deleteProgram(req.body.id)
        .then((deleted) => {
          return res.json({
            message: `Program with id: ${req.body.id} has been successfully deleted`,
          });
        })
        .catch((e) => {
          if (e.httpStatus) {
            const error = new CustomError(e.message, e.httpStatus);
            return next(error);
          }
          const error = new CustomError(e.message, null, e.code);
          return next(error);
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
    return async (req: Request, res: Response, next: NextFunction) => {
      return this.programService
        .createProgram(req.body.coachId, req.body.name)
        .then((newProgram) => {
          return res.json({ newProgram });
        })
        .catch((e) => {
          if (e.httpStatus) {
            const error = new CustomError(e.message, e.httpStatus);
            return next(error);
          }
          const error = new CustomError(e.message, null, e.code);
          return next(error);
        });
    };
  }
}
