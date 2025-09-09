export class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CustomError";
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}

export class DescompressionError extends CustomError {
    constructor(message: string) {
        super(message);
        this.name = "DescompressionError";
    }
}
