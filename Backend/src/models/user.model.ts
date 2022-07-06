import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { UserDocument } from "../interface";

const UserSchema = new mongoose.Schema(
  {
    Username: {
      type: String,
      required: true,
    },
    FullName: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Gender: {
      type: Number,
      default: 1,
    },
    Rule: {
      type: Number, //0 admin, 1 staff, 2 shipper
    }
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;
  console.log("🚀 ~ file: user.model.ts ~ line 41 ~ user", user)
  console.log({ candidatePassword })
  return bcrypt.compare(candidatePassword, user.Password).catch((e) => false);
};

UserSchema.pre("save", async function (next: any) {
  let user = this as UserDocument;
  console.log("🚀 ~ file: user.model.ts ~ line 46 ~ user", user)

  if (!user.isModified("Password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
  const hash = await bcrypt.hashSync(user.Password, salt);

  user.Password = hash;

  return next();
});

const User = mongoose.model("User", UserSchema);
export default User;
