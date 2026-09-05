import { Router } from "express";
import {
  addNewItem,
  getItems,
  getItemById,
  updateItemById,
  deleteItemById,
  sortShowsByYear,
  sortShowsByEpisode,
  getFilteredShowList,
} from "../controller/list.Controller.js";

const router = Router();

router.get("/", (req, res, next) => {
  const { Completed, year, sortBy, rating } = req.query; // Extract the 'Completed' query parameter

  if (Completed || year || rating) {
    getFilteredShowList(req, res, next);
  }
  else if (sortBy == "year") {
    sortShowsByYear(req, res, next);
  } else if (sortBy == "episode") {
    sortShowsByEpisode(req, res, next);
  }
  else {
    getItems(req, res, next);
  }
});
router.post("/", addNewItem);
router.get("/:id", getItemById);
router.put("/:id", updateItemById);
router.delete("/:id", deleteItemById);

export default router;
