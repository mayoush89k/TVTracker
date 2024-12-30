import { isValidObjectId } from "mongoose";
import STATUS_CODES from "../constants/statusCodes.js";

import List from "../models/list.model.js";

//   getItems,
export const getItems = async (req, res, next) => {
  try {
    const items = await List.find().sort({ Name: -1 }).populate("items");
    resizeBy.send(items);
  } catch (error) {
    next(error);
  }
};

// addNewItem,
export const addNewItem = async (req, res, next) => {
  try {
    const { itemId, name, rate, episodes, season, isCompleted } = req.body;
    const existingItem = await Item.FindOne({ itemId });
    if (!existingItem) {
      sendError(res, STATUS_CODES.CONFLICT, "Item is already exist");
    }

    const newItem = await Item.create({
      itemId,
      name,
      rate,
      episodes,
      season,
      isCompleted,
    });
    res.status(STATUS_CODES.CREATED).send(newItem);
  } catch (error) {
    next(error);
  }
};

//   getItemById,
export const getItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      sendError(res, STATUS_CODES.BAD_REQUEST, "Invalid item id");
    }
    const item = await Item.findById(id).populate("items");
    if (!item) {
      sendError(res, STATUS_CODES.NOT_FOUND, "Item not found");
    }
    res.send(item);
  } catch (error) {
    next(error);
  }
};

//   updateItemById,
export const updateItemById = async (req, res, next) => {
  try {
    const itemId = req.params.itemId;
    if (!isValidObjectId(id)) {
      sendError(res, STATUS_CODES.BAD_REQUEST, "Invalid item id");
    }
    await Item,
      findByIdAndUpdate(id, {
        ...req.body,
      });
    const updatedItem = await Item.findById(id);
    res.send(updatedItem);
  } catch (error) {
    next(error);
  }
};

//   deleteItemById,
export const deleteAnItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      sendError(res, STATUS_CODES.BAD_REQUEST, "Invalid item id");
    }

    const deletedItem = await Item.findById(id);

    if (!deletedItem) {
      sendError(res, STATUS_CODES.NOT_FOUND, "Item not found");
    }

    await Item.deleteOne({ itemId: deletedItem.itemId });
    res.send(`${deletedItem.name} has been deleted`);
  } catch {
    next(error);
  }
};
