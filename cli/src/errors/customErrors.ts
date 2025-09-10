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

export class FileDeleteError extends CustomError {
    constructor(message: string) {
        super(message);
        this.name = "FileDeleteError";
    }
}

export class FileDateError extends CustomError {
    constructor(message: string) {
        super(message);
        this.name = "FileDateError";
    }
}

export class FileAlreadyNewerError extends CustomError {
    constructor(message: string) {
        super(message);
        this.name = "FileAlreadyNewerError";
    }
}
