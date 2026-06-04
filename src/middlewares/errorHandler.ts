import express from "express";
import HttpException, { HttpStatus } from "../lib/exception/httpException";

class ErrorHandler {
  static async handle(
    error: unknown,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      if (error instanceof HttpException && error.isOperational === true) {
        return res.status(error.statusCode).json({
          success: false,
          data: {
            message: error.message,
          },
        });
      }

      // report unknown and uncaught error
      await ErrorHandler.reportErrorToDeveloper(error as Error, req);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        data: {
          message: "Something went wrong",
        },
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        data: { message: "Something went wrong" },
      });
    }
  }

  static async reportErrorToDeveloper(error: Error, req: express.Request) {
    const errorReport = {
      message: error.message,
      stack: error.stack,
      path: req.originalUrl,
      method: req.method,
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
      timestamp: new Date().toISOString(),
    };

    return;
  }
}

export default ErrorHandler;
