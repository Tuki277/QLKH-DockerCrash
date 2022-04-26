import { Request, Response, NextFunction } from "express";
import { IResponse } from "../interface";

const requiresUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  const user = req.user

  if (!user) {
    let data: IResponse<boolean> = {
        Object: undefined,
        Error: true,
        Message: "Forbidden"
    }
    return res.status(403).json({ "DataResponse": data });
  }

  return next();
};

export default requiresUser;
