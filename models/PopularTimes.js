import mongoose from "mongoose";

const popularTimesSchema = mongoose.Schema(
  {
    place: {
      type: String,
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    currentpop: {
      type: Number,
      required: true,
    },
    populartimes: [{ name: String, data: [Number] }],
  },
  { collection: "popular" }
);

export default mongoose.model("popular", popularTimesSchema);
