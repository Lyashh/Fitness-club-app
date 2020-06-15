import CustomError from "../types/errors/customError.types";
import { NextFunction, Response, Request } from "express";
import ProgramService from "../services/db/program.service";
import ExerciseService from "../services/db/exercise.service";

export default class DBValidationMiddleware {
  public validatePrgramHaveErxercises() {
    return (req: Request, res: Response, next: NextFunction) => {
      return ProgramService.programHaveErxercises(
        req.body.exercisesIds,
        req.body.programId
      )
        .then(() => {
          return next();
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

  public validateExercisesExist() {
    return (req: Request, res: Response, next: NextFunction) => {
      return ExerciseService.exercisesExist(req.body.exercisesIds)
        .then(() => {
          return next();
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
