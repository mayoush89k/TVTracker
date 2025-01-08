import { model, Schema } from "mongoose";

const ItemSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide the Name"],
  },
  rating: {
    type: Number,
    required: [true, "Please provide the Rating"],
  },
  episode: {
    type: Number,
    default: 1,
  },
  season: {
    type: Number,
    default: 1,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const List = model("List", ItemSchema);
export default List;
