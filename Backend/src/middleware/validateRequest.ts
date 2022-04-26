import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import log from "../logger";
import { IResponse } from "../interface";

const validateRequest = (schema: AnySchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        return next();
    } catch (e: any) {
        let data: IResponse<any> = {
            Message: e.errors,
            Error: true
        }
        // log.error(e);
        return res.status(200).json({ "DataResponse": data })
    }
};

export default validateRequest;