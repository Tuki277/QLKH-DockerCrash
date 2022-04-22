import { Request, Response } from "express";
import { boolean } from "yup";
import { createUser, findUserService } from "../services/user.service";
import { IResponse, UserDocument } from "../interface/index";
import {
  checkPhoneNumberDuplicated,
  checkUsernameDuplicated,
} from "../utils/checkFunction";

let data: IResponse<UserDocument> = {
  Object: undefined,
  Error: undefined,
  Message: undefined,
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { PhoneNumber, Username } = req.body;

    if (
      (await checkPhoneNumberDuplicated(PhoneNumber)) &&
      (await checkUsernameDuplicated(Username))
    ) {
      const user = await createUser(req.body);
      data = {
        Object: user,
        Error: false,
        Message: "Created",
      };
      return res.status(201).json({ DataResponse: data });
    } else {
      data = {
        Object: undefined,
        Error: true,
        Message: "Phone Number or Username is duplicated",
      };
      return res.status(201).json({ DataResponse: data });
    }
  } catch (error: any) {
    data = {
      Message: error.message,
      Error: true,
    };
    return res.status(400).json(error.message);
  }
};

export const getCurrentUserController = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;

  const dataResult = await findUserService({ _id: user });

  if (!dataResult) {
    data = {
      Error: false,
      Message: "Not Found",
    };
  } else {
    data = {
      Error: false,
      Message: "Query Success",
      Object: dataResult,
    };
  }

  res.status(200).json({ DataResponse: data });
};
