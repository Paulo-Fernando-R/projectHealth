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

export class DatabaseConnectionError extends CustomError {
    constructor(message: string) {
        super(message);
        this.name = "DatabaseConnectionError";
    }
}

export class WriteFileError extends CustomError {
    constructor(message: string) {
        super(message);
        this.name = "WriteFileError";
    }
}

export class InsertFileError extends CustomError {
    constructor(message: string) {
        super(message);
        this.name = "InsertFileError";
    }
}

export class ParsingError extends CustomError {
    constructor(message: string) {
        super(message);
        this.name = "ParsingError";
    }
}

export class InsertBatchError extends CustomError {
    constructor(message: string) {
        super(message);
        this.name = "InsertBatchError";
    }
}

export class QueryError extends CustomError {
    constructor(message: string) {
        super(message);
        this.name = "QueryError";
    }
}

export class MergeError extends CustomError {
    constructor(message: string) {
        super(message);
        this.name = "MergeError";
    }
}

export class DownloadError extends CustomError {
    constructor(message: string) {
        super(message);
        this.name = "DownloadError";
    }
}