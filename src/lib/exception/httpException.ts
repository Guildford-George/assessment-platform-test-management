
export enum HttpStatus {

    // 2xx Success
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,

    // 4xx Client Errors
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,

    // 5xx Server Errors
    INTERNAL_SERVER_ERROR = 500,
}


class HttpException extends Error {
    public statusCode: HttpStatus;
    public isOperational: boolean;
    public details?: object | undefined;
    public code: string
    constructor({ message, details, isOperational = true, statusCode, code }: { message: string, isOperational: boolean, details?: object | undefined, statusCode: HttpStatus, code: string }) {
        super(message)
        this.name = this.constructor.name; 
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;
        this.code= code
        Error.captureStackTrace(this, this.constructor);
    }

}

export default HttpException