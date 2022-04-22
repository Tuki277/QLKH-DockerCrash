import { sign } from "../utils/jwt";
import { UserDocument } from "../interface";
import config from "config";
import { LeanDocument } from "mongoose";

export const createAccessToken = ({
  user,
}: {
  user:
    | Omit<UserDocument, "Password">
    | LeanDocument<Omit<UserDocument, "Password">>
}) => {
  const accessToken = sign(
    { user: user._id },
    { expiresIn: config.get("accessTokenTtl") },
  );

  return accessToken;
};
