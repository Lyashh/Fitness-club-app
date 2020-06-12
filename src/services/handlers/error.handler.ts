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
      if (err.dbErrCode) {
        if (
          err.dbErrCode === "23502" ||
          err.dbErrCode === "23505" ||
          err.dbErrCode === "22P02"
        ) {
          return res.status(422).json({ message: err.body });
        }
        return res.status(422).json({ message: err.body });
      } else if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.body });
      }
      return res.status(500).json({ message: err.body });
    };
  }
}
