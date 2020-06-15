import { Request, Response, NextFunction } from "express";

export default class AuthController {
  public login() {
    return (req: Request, res: Response) => {
      res.json({
        message: req.session!.passport.user,
      });
    };
  }

  public localCallback() {
    return (req: Request, res: Response) => {
      console.log(req.session!.passport);
      return res.status(401).json({
        message: req.session!.messages,
      });
    };
  }

  public logout() {
    return (req: Request, res: Response) => {
      req.logout();
      return res.json({
        message: "success logout",
      });
    };
  }

  public registration() {
    return (req: Request, res: Response) => {
      return res.json("registration");
    };
  }

  public profile() {
    return (req: Request, res: Response) => {
      return res.json(req.session!.passport);
    };
  }
}
