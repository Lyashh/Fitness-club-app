import CustomError from "../../types/errors/customError.types";
import { Request, Response, NextFunction } from "express";

export default class ErrorHandler {
  public static get getHandler() {
    return (
      err: CustomError,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      if (err.type === "db") {
        if (err.dbErrCode === "23502" || err.dbErrCode === "23505") {
          return res.status(422).json({ message: err.body });
        }
      }
      return res.status(422).json({ message: err.body });
    };
  }
}
