import { Request, Response, NextFunction } from "express";
import { Role } from "../utils/enum";
import { ERROR_RESPONSE } from "../utils/message";

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user || user.role !== Role.ADMIN) {
    return res.status(403).json({
      message: ERROR_RESPONSE.FORBIDDEN_ACCESS,
    });
  }

  next();
};
