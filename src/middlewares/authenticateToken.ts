import express from "express";
import { UnauthorizedException } from "../lib/exception/statusCodeExceptions";
import { AUTH_ERRORS } from "../lib/exception/errorMessage";
import type { TokenType } from "../lib/types";
import AppToken from "../lib/appToken";

export default class AuthenticateToken {
  //   verify token against organization level token type
  static accessToken(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { authorization } = req.headers;
    
      const token = authorization?.split(" ")[1];
      if (!token) {
        throw new UnauthorizedException({
          error: AUTH_ERRORS.UNAUTHORIZED,
        });
      }
      req.user = AppToken.decodeAccessToken(token);
      next();
    } catch (error) {
      next(error);
    }
  }

  //   verify token against all access level token type
  static allToken(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { authorization } = req.headers;

      const token = authorization?.split(" ")[1];
      if (!token) {
        throw new UnauthorizedException({
          error: AUTH_ERRORS.UNAUTHORIZED,
        });
      }
      req.user = AppToken.decodeUnknownToken(token);

      next();
    } catch (error) {
      next(error);
    }
  }

  //   verify token against selected access level token type
  static specificToken(tokenTypeList: TokenType[]) {
    return (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      try {
        const { authorization } = req.headers;

        const token = authorization?.split(" ")[1];
        if (!token) {
          throw new UnauthorizedException({
            error: AUTH_ERRORS.UNAUTHORIZED,
          });
        }
        req.user = AppToken.decodeSpecificToken(token, tokenTypeList);

        next();
      } catch (error) {
        next(error);
      }
    };
  }
}
