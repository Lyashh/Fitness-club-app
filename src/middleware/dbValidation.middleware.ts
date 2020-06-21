import CustomError from "../types/errors/customError.types";
import { NextFunction, Response, Request } from "express";
import ProgramService from "../services/db/program.service";
import ExerciseService from "../services/db/exercise.service";
import UserService from "../services/db/user.service";

export default class DBValidationMiddleware {
  public validateProgramHaveErxercises() {
    return (req: Request, res: Response, next: NextFunction) => {
      return ProgramService.programHaveErxercises(
        req.body.exercisesIds,
        req.body.id
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

  //user or coach
  public programBelongsToUser() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const error = new CustomError(
        `You cant access to program with id: ${req.params.id}`,
        403
      );

      return UserService.getUserById(
        parseInt(req.session!.passport.user.id),
        true
      )
        .then((user) => {
          // validation for coach
          if (user.role.name === "coach") {
            const validResultCoach = user.coachPrograms.some((program) => {
              return program.id === parseInt(req.params.id);
            });
            if (validResultCoach) {
              return next();
            }
            return next(error);
          }

          // validation for user
          const validResultUser = user.programs.some((program) => {
            return program.id === parseInt(req.params.id);
          });
          if (validResultUser) {
            return next();
          }
          return next(error);
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
