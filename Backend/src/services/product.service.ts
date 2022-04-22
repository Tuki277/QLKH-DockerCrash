import mongoose from "mongoose";
import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import { IProductDocument } from "../interface";
import Product from "../models/product.model";

export function createPostService(input: DocumentDefinition<IProductDocument>) {
  return Product.create(input);
}

export function findPostService(
  query: FilterQuery<IProductDocument>,
  options: QueryOptions = { lean: true }
) {
  return Product.findOne(query, {}, options);
}

export function findAndUpdateService(
  query: FilterQuery<IProductDocument>,
  update: UpdateQuery<IProductDocument>,
  options: QueryOptions
) {
  return Product.findOneAndUpdate(query, update, options);
}

export function deletePostService(query: FilterQuery<IProductDocument>) {
  return Product.deleteOne(query);
}

export const getPostByIdService = (id: string) => {
  const IdObject = new mongoose.Types.ObjectId(id);
  return Product.aggregate([
    { $match: { _id: IdObject } },
    {
      $lookup: {
        from: "users",
        localField: "UserCreated",
        foreignField: "_id",
        as: "UserCreated",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "Shipper",
        foreignField: "_id",
        as: "Shipper",
      },
    },
    {
      $project: {
        "UserCreated.Password": 0,
        "UserCreated.Rule": 0,
        "Shipper.Password": 0,
        "Shipper.Rule": 0,
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);
};

export const getPostService = (id: string, rule: number) => {
  if (rule == 1) {
    return Product.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "UserCreated",
          foreignField: "_id",
          as: "UserCreated",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "Shipper",
          foreignField: "_id",
          as: "Shipper",
        },
      },
      {
        $project: {
          "UserCreated.Password": 0,
          "UserCreated.Rule": 0,
          "Shipper.Password": 0,
          "Shipper.Rule": 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);
  }
  if (rule == 2) {
    return Product.aggregate([
      { $match: { $or: [{ Shipper: id }, { Status: "New" }] } },
      {
        $lookup: {
          from: "users",
          localField: "UserCreated",
          foreignField: "_id",
          as: "UserCreated",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "Shipper",
          foreignField: "_id",
          as: "Shipper",
        },
      },
      {
        $project: {
          "UserCreated.Password": 0,
          "UserCreated.Rule": 0,
          "Shipper.Password": 0,
          "Shipper.Rule": 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);
  }
};

export const filterPostService = (id: string, rule: number, status: string) => {
  if (rule == 1) {
    return Product.aggregate([
      { $match: { "Status": status }},
      {
        $lookup: {
          from: "users",
          localField: "UserCreated",
          foreignField: "_id",
          as: "UserCreated",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "Shipper",
          foreignField: "_id",
          as: "Shipper",
        },
      },
      {
        $project: {
          "UserCreated.Password": 0,
          "UserCreated.Rule": 0,
          "Shipper.Password": 0,
          "Shipper.Rule": 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);
  }
  if (rule == 2 && status !== "New" && status !== "Rejected") {
    return Product.aggregate([
      { $match: { $and: [{ Shipper: id }, { Status: status }] } },
      {
        $lookup: {
          from: "users",
          localField: "UserCreated",
          foreignField: "_id",
          as: "UserCreated",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "Shipper",
          foreignField: "_id",
          as: "Shipper",
        },
      },
      {
        $project: {
          "UserCreated.Password": 0,
          "UserCreated.Rule": 0,
          "Shipper.Password": 0,
          "Shipper.Rule": 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);
  }

  if (rule == 2 && (status === "New" || status === "Rejected")) {
    return Product.aggregate([
      { $match: { Status: status } },
      {
        $lookup: {
          from: "users",
          localField: "UserCreated",
          foreignField: "_id",
          as: "UserCreated",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "Shipper",
          foreignField: "_id",
          as: "Shipper",
        },
      },
      {
        $project: {
          "UserCreated.Password": 0,
          "UserCreated.Rule": 0,
          "Shipper.Password": 0,
          "Shipper.Rule": 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);
  }
};

export function search(
  query: FilterQuery<IProductDocument>,
  options: QueryOptions = { lean: true }
) {
  return Product.find(query, {}, options);
}
