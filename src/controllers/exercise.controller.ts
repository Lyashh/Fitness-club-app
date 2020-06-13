import { Request, Response, NextFunction } from "express";
import ExerciseService from "../services/db/exercise.service";
import CustomError from "../types/errors/customError.types";

export default class ExerciseController {
  public getAllExercises() {
    return async (req: Request, res: Response) => {
      const exercises = await ExerciseService.getAllExercises();
      return res.json(exercises);
    };
  }

  public newExercise() {
    return async (req: Request, res: Response, next: NextFunction) => {
      return ExerciseService.createExercise(req.body)
        .then((newExercise) => {
          return res.json(newExercise);
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
