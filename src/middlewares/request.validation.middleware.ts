import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ApplicationError, ErrorTypes } from "../core/errors";

export class RequestValidation {
    static validateRequest(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            const error = new ApplicationError(ErrorTypes.BadRequest());
            return res.status(error.status).json(error);
        } else {
            next();
        }
    }
}