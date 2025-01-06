import { NextFunction, Request, Response } from 'express';

export function errorController(
  err: Error & { status?: number },
  req: Request,
  res: Response,
  next: NextFunction,
) {
  err.status = err.status || 500;
  res.status(err.status).json({
    message: err.message,
  });
}
