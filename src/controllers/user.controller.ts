import { Response, Request, NextFunction } from "express";
import UserService from "../services/db/user.service";
import CustomError from "../types/errors/customError.types";

export default class UserController {

  public getAllUsers() {
    return async (req: Request, res: Response) => {
      const users = await UserService.getAllUsers();
      return res.json(users);
    };
  }

  public getAthletes() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const users = await UserService.getAthletes();
        return res.json(users);
      } catch (e) {
        if (e.httpStatus) {
          const error = new CustomError(e.message, e.httpStatus);
          return next(error);
        }
        const error = new CustomError(e.message, null, e.code);
        return next(error);
      }
    };
  }

  public getUserById() {
    return (req: Request, res: Response, next: NextFunction) => {
      return UserService.getUserById(parseInt(req.params.id), true)
        .then((user) => {
          return res.json(user);
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

  public createUser() {
    return async (req: Request, res: Response, next: NextFunction) => {
      UserService.createUser(req.body)
        .then((newUser) => res.json(newUser))
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

  public deleteUser() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const id = req.session!.passport.user.id;
      return UserService.deleteUser(id)
        .then((deleted) => {
          req.logout();
          return res.json({
            message: `User with id: ${id} has been successfully deleted`,
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

  public updateUser() {
    return async (req: Request, res: Response, next: NextFunction) => {
      return UserService.updateUser(req.session!.passport.user.id, req.body)
        .then((updateUser) => {
          return req.logIn(updateUser, (err) => {
            return res.json(updateUser);
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

  public assignProgramToUser() {
    return async (req: Request, res: Response, next: NextFunction) => {
      return UserService.assignProgramToUser(
        req.body.userId,
        req.body.programId,
        req.session!.passport.user.id
      )
        .then((user) => {
          return res.json(user);
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

  public unAssignProgramToUser() {
    return async (req: Request, res: Response, next: NextFunction) => {
      return (
        UserService
          //user id from session
          .unassignProgramToUser(
            req.body.userId,
            req.body.programId,
            req.session!.passport.user.id
          )
          .then((user) => {
            return res.json(user);
          })
          .catch((e) => {
            if (e.httpStatus) {
              const error = new CustomError(e.message, e.httpStatus);
              return next(error);
            }
            const error = new CustomError(e.message, null, e.code);
            return next(error);
          })
      );
    };
  }

  public oneCoachPrograms() {
    return async (req: Request, res: Response, next: NextFunction) => {
      return UserService.userOneCoachPrograms(
        parseInt(req.params.id),
        req.session!.passport.user.id
      )
        .then((user) => {
          return res.json(user);
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
