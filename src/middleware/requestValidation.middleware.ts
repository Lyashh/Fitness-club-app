import { Response, Request, NextFunction } from "express";
import CustomError from "../types/errors/customError.types";
import UserValidation from "../services/validation/user.validation";
import ProgramValidation from "../services/validation/program.validation";
import ExerciseValidation from "../services/validation/exercise.validation";
import AuthValidation from "../services/validation/auth.validation";

export default class ValidationMiddleware {
  public validateNewUser() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const validResult = await UserValidation.newUser(req.body);
      if (validResult.error) {
        const error = new CustomError(
          validResult.error.details[0].message,
          400
        );
        return next(error);
      }
      return next();
    };
  }

  public validateBodyId() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const validResult = await UserValidation.idIsNumber(req.body.id);
      if (validResult.error) {
        const error = new CustomError(
          `id field ${validResult.error.details[0].message}`,
          400
        );
        return next(error);
      }
      return next();
    };
  }

  public validateModifiedUser() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const validResult = await UserValidation.updateUser(req.body);
      if (validResult.error) {
        const error = new CustomError(
          validResult.error.details[0].message,
          400
        );
        return next(error);
      }
      return next();
    };
  }

  public paramsIsNumber(paramsKeys: Array<string>) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const params = paramsKeys.map((el) => {
        return req.params[el];
      });
      const validResult = await UserValidation.paramsIsNumber(params);
      if (validResult.error) {
        const error = new CustomError(
          `${validResult.error.details[0].context?.value} param ${validResult.error.details[0].message}`,
          400
        );
        return next(error);
      }
      return next();
    };
  }

  public validateNewProgram() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const validResult = await ProgramValidation.newProgram(req.body);
      if (validResult.error) {
        const error = new CustomError(
          validResult.error.details[0].message,
          400
        );
        return next(error);
      }
      return next();
    };
  }

  public validateModifiedProgram() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const validResult = await ProgramValidation.updateProgram(req.body);
      if (validResult.error) {
        const error = new CustomError(
          validResult.error.details[0].message,
          400
        );
        return next(error);
      }
      return next();
    };
  }

  public validateNewExercise() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const validResult = await ExerciseValidation.newExercise(req.body);
      if (validResult.error) {
        const error = new CustomError(
          validResult.error.details[0].message,
          400
        );
        return next(error);
      }
      return next();
    };
  }

  public validateModifiedExercise() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const validResult = await ExerciseValidation.updateExercise(req.body);
      if (validResult.error) {
        const error = new CustomError(
          validResult.error.details[0].message,
          400
        );
        return next(error);
      }
      return next();
    };
  }

  public validateAddOrRemoveExerciseToProgram() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const validResult = await ProgramValidation.addOrRemoveExerciseToProgram(
        req.body
      );
      if (validResult.error) {
        const error = new CustomError(
          validResult.error.details[0].message,
          400
        );
        return next(error);
      }
      return next();
    };
  }

  public validateLogin() {
    return async (req: Request, res: Response, next: NextFunction) => {
      console.log(req.body);

      const validResult = await AuthValidation.login(req.body);
      if (validResult.error) {
        const error = new CustomError(
          validResult.error.details[0].message,
          400
        );
        return next(error);
      }
      return next();
    };
  }

  public validateAssignAndUnProgramToUser() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const validResult = await UserValidation.assignAndUnProgramToUser(
        req.body
      );
      if (validResult.error) {
        const error = new CustomError(
          validResult.error.details[0].message,
          400
        );
        return next(error);
      }
      return next();
    };
  }


}
