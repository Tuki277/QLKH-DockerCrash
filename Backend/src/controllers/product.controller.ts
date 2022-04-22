import { Request, Response } from "express";
import { IProductDocument, IResponse } from "../interface";
import {
  createPostService,
  deletePostService,
  filterPostService,
  findAndUpdateService,
  findPostService,
  getPostByIdService,
  getPostService,
  search,
} from "../services/product.service";
import { findUserService } from "../services/user.service";
import { checkCan } from "../utils/checkFunction";
import { UserDocument } from "./../interface";

let data: IResponse<IProductDocument> = {
  Object: undefined,
  Error: undefined,
  Message: undefined,
};

export const createPostController = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user;

  const body = req.body;

  const post = await createPostService({ ...body, UserCreated: userId });

  data = {
    Object: post,
    Error: false,
    Message: "Created",
  };

  return res.status(201).json({ DataResponse: data });
};

export const getPostController = async (req: Request, res: Response) => {
  // @ts-ignore
  const _id = req.user;

  const user: UserDocument = await findUserService({ _id })

  const findProduct = await getPostService(user._id, user.Rule);

  const dataResult = findProduct?.map(x => ({
    ...x,
    Action: checkCan(x.Status)
  }))

  data = {
    Object: dataResult,
    Error: false,
    Message: "Query Success",
  };
  res.status(200).json({ DataResponse: data });
};

export const updatePostController = async (req: Request, res: Response) => {

  //@ts-ignore
  const usedId = req.user
  const _id = req.params.id
  const bodyUpdate = req.body;

  const post: IProductDocument = await findPostService({ _id });

  if (!post) {
    data = {
      Error: true,
      Message: "Not Found"
    }
    res.status(404).json({ "DataResponse": data })
  }

  if (String(post.UserCreated) !== String(usedId)) {
    data = {
      Error: true,
      Message: "Forbidden"
    }
  }

  await findAndUpdateService({ _id }, bodyUpdate , { new: true })
  data = {
    Object: bodyUpdate,
    Error: false,
    Message: "Updated"
  }

  res.status(200).json({ "DataResponse": data })

}

export const deletePostController = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user
  const _id = req.params.id

  const post: IProductDocument = await findPostService({ _id })

  if ( !post ) {
    data = {
      Error: true,
      Message: "Not Found"
    }

    res.status(200).json({ "DataResponse": data })
  }

  if (String(post.UserCreated) !== String(userId)) {
    data = {
      Error: true,
      Message: "Forbidden"
    }
  }

  await deletePostService({ _id })
  data = {
    Error: false,
    Message: "Deleted"
  }
  res.status(200).json({ "DataResponse": data })
}

export const finishProductController = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user
  const _id = req.params.id

  const post: IProductDocument = await findPostService({ _id })

  if ( !post ) {
    data = {
      Error: true,
      Message: "Not Found"
    }

    res.status(200).json({ "DataResponse": data })
  }

  if (String(post.UserCreated) !== String(userId)) {
    data = {
      Error: true,
      Message: "Forbidden"
    }
  }

  const contentUpdate = {
    Status: "Finish",
    Shipper: userId
  }

  await findAndUpdateService({ _id }, contentUpdate, { new: true })
  data = {
    Error: false,
    Message: "Finish"
  }
  res.status(200).json({ "DataResponse": data })
}

export const rejectProductController = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user
  const _id = req.params.id

  const post: IProductDocument = await findPostService({ _id })

  if ( !post ) {
    data = {
      Error: true,
      Message: "Not Found"
    }

    res.status(200).json({ "DataResponse": data })
  }

  if (String(post.UserCreated) !== String(userId)) {
    data = {
      Error: true,
      Message: "Forbidden"
    }
  }

  const contentUpdate = {
    Status: "Rejected",
    Shipper: null
  }

  await findAndUpdateService({ _id }, contentUpdate, { new: true })
  data = {
    Error: false,
    Message: "Rejected"
  }
  res.status(200).json({ "DataResponse": data })
}

export const deliveredProductController = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user
  const _id = req.params.id

  const post: IProductDocument = await findPostService({ _id })

  if ( !post ) {
    data = {
      Error: true,
      Message: "Not Found"
    }

    res.status(200).json({ "DataResponse": data })
  }

  if (String(post.UserCreated) !== String(userId)) {
    data = {
      Error: true,
      Message: "Forbidden"
    }
  }

  const contentUpdate = {
    Status: "Delivered",
    Shipper: userId
  }

  await findAndUpdateService({ _id }, contentUpdate, { new: true })
  data = {
    Error: false,
    Message: "Delivered"
  }
  res.status(200).json({ "DataResponse": data })
}

export const findPostByIdController = async (req: Request, res: Response) => {
  const _id = req.params.id

  const post = await getPostByIdService(_id)

  data = {
    Error: false,
    Message: "Query Success",
    Object: post,
    Action: checkCan(post[0].Status)
  }

  res.status(200).json({ "DataResponse": data })
}

export const searchController = async (req: Request, res: Response) => {
  const { NameProduct } = req.body

  const dataResult = await search({ NameProduct: { $regex : new RegExp(NameProduct, "i") }})

  data = {
    Error: false,
    Message: "Query Success",
    Object: dataResult
  }

  res.status(200).json({ "DataResponse": data })
}

export const filterPostController = async (req: Request, res: Response) => {
  // @ts-ignore
  const _id = req.user;
  const { Status } = req.body
  let findProduct = null;

  const user: UserDocument = await findUserService({ _id })

  if (Status === "All") {
    findProduct = await getPostService(user._id, user.Rule);
  } else {
    findProduct = await filterPostService(user._id, user.Rule, Status);
  }

  const dataResult = findProduct?.map(x => ({
    ...x,
    Action: checkCan(x.Status)
  }))

  data = {
    Object: dataResult,
    Error: false,
    Message: "Query Success",
  };
  res.status(200).json({ DataResponse: data });
};