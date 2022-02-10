import mongoose, { trusted } from "mongoose";

const repositorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: {
        unique: true,
      }
    },
    url: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    userId: {
      type: String,
      required: true,
    },
    timeSstamps: true,
  }
);
