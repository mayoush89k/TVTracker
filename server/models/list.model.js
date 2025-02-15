import { model, Schema } from "mongoose";

const ItemSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide the Name"],
  },
  rating: {
    type: Number,
    default: 0,
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
  year:{
    type: Number,
    default: 0,
  }
});

const List = model("List", ItemSchema);
export default List;
