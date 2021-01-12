import mongoose from "mongoose";

const houseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    abbrv: {
      type: String,
      required: true,
    },
    floors: {
      type: [String],
      required: false,
    },
  },
  { collection: "house" }
);

const model = mongoose.model("house", houseSchema);

export default model;
