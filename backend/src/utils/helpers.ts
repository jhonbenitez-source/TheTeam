import express, { Request, Response, NextFunction } from 'express';

export class ApiResponse {
  constructor(
    public success: boolean,
    public message: string,
    public data?: any,
    public errors?: any
  ) {}
}

export function sendSuccess(res: Response, message: string, data?: any, status = 200) {
  res.status(status).json(new ApiResponse(true, message, data));
}

export function sendError(res: Response, message: string, status = 400, errors?: any) {
  res.status(status).json(new ApiResponse(false, message, null, errors));
}

export function asyncHandler(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
