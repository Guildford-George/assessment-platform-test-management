import HttpException, { HttpStatus } from "./httpException";

export class BadRequestException extends HttpException {
    constructor ({error, details}:{error: {code: string, message: string}, details?: object}){
        super({code: error.code, message:error.message, statusCode: HttpStatus.BAD_REQUEST,isOperational: true, details})
    }
}
export class UnauthorizedException extends HttpException {
  constructor({ error, details }: { error: {code: string, message: string}; details?: object }) {
    super({
      code: error.code, message:error.message,
      statusCode: HttpStatus.UNAUTHORIZED,
      isOperational: true,
      details,
    });
  }
}

export class ForbiddenException extends HttpException {
  constructor({ error, details }: { error: {code: string, message: string}; details?: object }) {
    super({
      code: error.code, message:error.message,
      statusCode: HttpStatus.FORBIDDEN,
      isOperational: true,
      details,
    });
  }
}

export class NotFoundException extends HttpException {
  constructor({ error, details }: { error: {code: string, message: string}; details?: object }) {
    super({
      code: error.code, message:error.message,
      statusCode: HttpStatus.NOT_FOUND,
      isOperational: true,
      details,
    });
  }
}

export class ConflictException extends HttpException {
  constructor({ error, details }: { error: {code: string, message: string}; details?: object }) {
    super({
      code: error.code, message:error.message,
      statusCode: HttpStatus.CONFLICT,
      isOperational: true,
      details,
    });
  }
}


export class InternalServerErrorException extends HttpException {
  constructor({ error, details }: { error: {code: string, message: string}; details?: object }) {
    super({
      code: error.code, message:error.message,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      isOperational: false,
      details,
    });
  }
}