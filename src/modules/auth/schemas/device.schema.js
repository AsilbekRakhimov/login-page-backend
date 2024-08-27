import mongoose, { SchemaTypes } from "mongoose";

const devicesSchema = new mongoose.Schema(
  {
    ua: {
      type: String,
    },
    browser: {
      type: Object,
    },
    engine: {
      type: Object,
    },
    os: {
      type: Object,
    },
    device: {
      type: Object,
    },
    cpu: {
      type: Object,
    },
    user_id: {
      type: SchemaTypes.ObjectId,
      ref: "users",
    },
  },
  {
    _id: true,
    timestamps: true,
    collection: "devices",
  }
);

export const devices = mongoose.model("devices", devicesSchema);
