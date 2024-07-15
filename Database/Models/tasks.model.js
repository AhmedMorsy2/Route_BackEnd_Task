import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    TextTask: String,
    ListOfTasks: [String],
    status: {
      type: String,
      enum: ["private", "public"],
      default: "private",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Tasks = model("Tasks", schema);
