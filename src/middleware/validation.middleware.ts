import { Response, Request, NextFunction } from "express";
import ValidationService from "../services/validation/validation.service";
import CustomError from "../types/errors/customError.types";

export default class ValidationMiddleware {
  public validateNewUser() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const validResult = await ValidationService.newUser(req.body);
      if (validResult.error) {
        const error = new CustomError(
          validResult.error.details[0].message,
          422
        );
        return next(error);
      }
      next();
    };
  }
}
