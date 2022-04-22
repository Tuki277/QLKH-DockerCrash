import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    NameProduct: {
      type: String,
      required: true
    },
    UserSend: {
      type: String,
      require: true
    },
    UserSendAddress: {
      type: String,
      required: true,
    },
    PhoneNumberSend: {
      type: String,
      required: true
    },
    UserCreated: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Status: {
      type: String,
      default: "New",
    },
    Shipper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    Weight: {
      type: Number,
      required: true,
    },
    UserReceive: {
      type: String,
      required: true,
    },
    PhoneNumberReceive: {
      type: String,
      required: true,
    },
    AddressReceive: {
      type: String,
      required: true,
    },
    Note: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
