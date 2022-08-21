export class ApplicationError extends Error {
    status: number;
    message: string;
    constructor(type: ErrorMessage) {
        super();
        this.status = type.status;
        this.message = type.message;
    }
}

export class ErrorMessage {
    status: number;
    message: string;

    public constructor({ status, message}) {
        this.status = status;
        this.message = message;
    }
}

export class ErrorTypes {
    static BadRequest(): ErrorMessage {
        return new ErrorMessage({
            status: 400,
            message: "Invalid Request"
        });
    }

    static Unauthorized(): ErrorMessage {
        return new ErrorMessage({
            status: 401,
            message: "Unauthorized"
        });
    }

    static Forbidden(): ErrorMessage {
        return new ErrorMessage({
            status: 403,
            message: "This operation is forbidden and can not be completed"
        })
    }

    static NotFound(): ErrorMessage {
        return new ErrorMessage({
            status: 404,
            message: "The resource could not be found"
        });
    }

    static InternalError(): ErrorMessage {
        return new ErrorMessage({
            status: 500,
            message: "Oops! Something went wrong"
        })
    }
}