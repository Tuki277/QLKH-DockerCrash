import { Request, Response } from "express";
import { IResponse, UserDocument } from "../interface";
import { createAccessToken } from "../services/sesssion.service";
import { validatePassword } from "../services/user.service";

export const loginController = async (req: Request, res: Response) => {
    const user: any = await validatePassword(req.body)

    let data: IResponse<UserDocument> = {
        Object: undefined,
        Error: undefined,
        Message: undefined
    }

    if (!user) {
        data = {
            Object: undefined,
            Error: true,
            Message: "Login fail"
        }
        return res.status(401).json({ "DataResponse": data })
    } else {

        const accessToken = createAccessToken({
            user
        })

        data = {
            Object: user,
            Error: false,
            Message: "Login success",
            AccessToken: accessToken
        }

        return res.status(200).json({ "DataResponse": data })
    }
}