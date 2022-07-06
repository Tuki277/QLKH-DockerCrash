import c from "config";
import { DocumentDefinition, FilterQuery } from "mongoose";
import { UserDocument } from "../interface";
import User from "../models/user.model";

export const createUser = async (input: DocumentDefinition<UserDocument>) => {
  try {
    return await User.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const findUserService = async (query: FilterQuery<UserDocument>) =>
  User.findOne(query).select({ Password: 0 });

export const validatePassword = async ({
  Username,
  Password,
}: {
  Username: UserDocument["Username"];
  Password: string;
}): Promise<boolean | UserDocument> => {
  const user = await User.findOne({ Username });
  console.log("🚀 ~ file: user.service.ts ~ line 25 ~ user", user)
  console.log("password parameter == ", Password)

  if (user == null) {
    return false;
  }

  const isValid = await user.comparePassword(Password);
  console.log("🚀 ~ file: user.service.ts ~ line 33 ~ isValid", isValid)

  if (!isValid) {
    return false;
  }

  return user;
};
