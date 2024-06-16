import { Request, Response, NextFunction } from "express";
import { Logger } from "./logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  Logger.error(err.message, err);
  res.status(500).send("Internal Server Error");
};
