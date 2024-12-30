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
  itemId: {
    type: String,
    required: [true, "Please provide the ItemId"],
    unique: [true, "Item id must be unique"],
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

const Item = model("Item", ItemSchema);
export default Item;
