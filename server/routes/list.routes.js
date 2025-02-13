import { Router } from "express";
import {
  addNewItem,
  getItems,
  getItemById,
  updateItemById,
  deleteItemById,
  getCompletedShowList,
  getInCompletedShowList,
  sortShowsByYear,
  sortShowsByEpisode
} from "../controller/list.Controller.js";

const router = Router();

router.get("/", (req, res, next) => {
  const { Completed, year, sortBy } = req.query; // Extract the 'Completed' query parameter

  if (Completed === "true") {
    // Call the getCompletedShowList logic
    getCompletedShowList(req, res, next);
  } else if (Completed === "false") {
    // Call the getInCompletedShowList logic
    getInCompletedShowList(req, res, next);
  } else if (sortBy == "year") {
    sortShowsByYear(req, res, next);
  } else if (sortBy == "episode") {
    sortShowsByEpisode(req, res, next);
  } else {
    getItems(req, res, next);
  }
});
router.post("/", addNewItem);
router.get("/:id", getItemById);
router.put("/:id", updateItemById);
router.delete("/:id", deleteItemById);

export default router;
