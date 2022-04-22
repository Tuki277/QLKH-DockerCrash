import { Request, Response, NextFunction } from "express";
import { decode } from "../utils/jwt";

const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = (req.headers.authorization)?.replace(/^Bearer\s/, "")

    if (!accessToken) {
        return next();
    }

    const { decoded, expired } = decode(accessToken)

    if (decoded) {
        // @ts-ignore
        req.user = decoded.user

        return next();
    }

    return next();
}

export default authentication;