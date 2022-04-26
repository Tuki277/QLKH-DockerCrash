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

  if (user == null) {
    return false;
  }

  const isValid = await user.comparePassword(Password);

  if (!isValid) {
    return false;
  }

  return user;
};
