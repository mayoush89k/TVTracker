import { isValidObjectId } from "mongoose";
import STATUS_CODES from "../constants/statusCodes.js";
import List from "../models/list.model.js";

const sendError = (res, statusCode, errorMsg) => {
  console.log("statusCode: ", statusCode);
  res.status(statusCode);
  throw new Error(errorMsg);
};

//   getItems,
export const getItems = async (req, res, next) => {
  try {
    const { year } = req.query;
    const items = year
      ? await List.find({ year: year }).sort({ name: 1 })
      : await List.find().sort({ name: 1 });
    res.send(items);
  } catch (error) {
    next(error);
  }
};

// addNewItem,
export const addNewItem = async (req, res, next) => {
  try {
    const { name, rating, episode, season, isCompleted, year } = req.body;
    const existingItem = await List.findOne({ name });
    if (existingItem) {
      sendError(res, STATUS_CODES.CONFLICT, "Item is already exist");
    }

    const newItem = await List.create({
      name,
      rating,
      episode,
      season,
      isCompleted,
      year,
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
    const item = await List.findById(id);
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
    const itemId = req.params.id;
    if (!isValidObjectId(itemId)) {
      sendError(res, STATUS_CODES.BAD_REQUEST, "Invalid item id");
    }
    await List.findByIdAndUpdate(itemId, {
      ...req.body,
    });
    const updatedItem = await List.findById(itemId);
    res.send(updatedItem);
  } catch (error) {
    next(error);
  }
};

//   deleteItemById,
export const deleteItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      sendError(res, STATUS_CODES.BAD_REQUEST, "Invalid item id");
    }
    const deletedItem = await List.findById({ _id: id });
    if (!deletedItem) {
      sendError(res, STATUS_CODES.NOT_FOUND, "Item not found");
    }

    await List.deleteOne({ _id: deletedItem._id });
    res.send(`${deletedItem.name} has been deleted`);
  } catch {
    next(error);
  }
};

// sort the shows by year
export const sortShowsByYear = async (req, res, next) => {
  try {
    const items = await List.find().sort({ year: 1 });
    res.send(items);
  } catch (error) {
    next(error);
  }
};

// sort the shows by episode
export const sortShowsByEpisode = async (req, res, next) => {
  try {
    const items = await List.find().sort({ episode: 1 });
    res.send(items);
  } catch (error) {
    next(error);
  }
};

export const getFilteredShowList = async (req, res, next) => {
  try {
    const { rating, Completed, year } = req.query;
    const items =
      // rating completed year
      rating && year && Completed
        ? await List.find({ rating, isCompleted: Completed, year }).sort({
            name: 1,
          })
        : // rating year
          rating && year
          ? await List.find({ rating, year }).sort({ name: 1 })
          : // rating completed
            rating && Completed
            ? await List.find({ rating, isCompleted: Completed }).sort({
                name: 1,
              })
            : // completed year
              Completed && year
              ? await List.find({ isCompleted: Completed, year }).sort({
                  name: 1,
                })
              : // completed
                Completed
                ? await List.find({ isCompleted: Completed }).sort({ name: 1 })
                : // year
                  year
                  ? await List.find({ year }).sort({ name: 1 })
                  : // rating
                    await List.find({ rating }).sort({ name: 1 });
    res.send(items);
  } catch (error) {
    next(error);
  }
};
