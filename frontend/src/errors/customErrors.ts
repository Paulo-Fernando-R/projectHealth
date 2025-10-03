export class CustomError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string = "Bad Request") {
        super(message, 400);
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message: string = "Unauthorized") {
        super(message, 401);
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string = "Not Found") {
        super(message, 404);
    }    
}
export class InternalServerError extends CustomError {
    constructor(message: string = "Internal Server Error") {
        super(message, 500);
    }    
}

export class ServiceUnavailableError extends CustomError {
    constructor(message: string = "Service Unavailable") {
        super(message, 503);
    }    
}

export class UnknownError extends CustomError {
    constructor(message: string = "Unknown Error") {
        super(message, 520);
    }    
}
