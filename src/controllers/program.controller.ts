import { Response, Request, NextFunction } from "express";
import ProgramService from "../services/db/program.service";
import CustomError from "../types/errors/customError.types";

export default class ProgramController {
  public getProgramById() {
    return async (req: Request, res: Response, next: NextFunction) => {
      return ProgramService.getProgramById(req.body.id)
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
      const programs = await ProgramService.getAllPrograms();
      return res.json(programs);
    };
  }

  public deleteProgram() {
    return async (req: Request, res: Response, next: NextFunction) => {
      return ProgramService.deleteProgram(req.body.id)
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
    return async (req: Request, res: Response, next: NextFunction) => {
      return ProgramService.updateProgram(req.body.id, req.body.newFields)
        .then((updatedProgram) => {
          return res.json(updatedProgram);
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

  public createProgram() {
    return async (req: Request, res: Response, next: NextFunction) => {
      return ProgramService.createProgram(req.body.coachId, req.body.name)
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

  public addExerciseToProgram() {
    return async (req: Request, res: Response, next: NextFunction) => {
      return ProgramService.addExerciseToProgram(
        req.body.exerciseId,
        req.body.programId
      )
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
