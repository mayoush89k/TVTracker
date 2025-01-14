import { Router } from "express";
import {
  addNewItem,
  getItems,
  getItemById,
  updateItemById,
  deleteItemById,
  getCompletedShowList,
  getInCompletedShowList,
} from "../controller/list.Controller.js";

const router = Router();

router.get("/", (req, res, next) => {
  const { Completed } = req.query; // Extract the 'Completed' query parameter

  if (Completed === "true") {
    // Call the getCompletedShowList logic
    getCompletedShowList(req, res, next);
  } else if (Completed === "false") {
    // Call the getInCompletedShowList logic
    getInCompletedShowList(req, res, next);
  } else {
    getItems(req, res, next);
  }
});
router.post("/", addNewItem);
router.get("/:id", getItemById);
router.put("/:id", updateItemById);
router.delete("/:id", deleteItemById);
// router.get("/?Completed=true" , getCompletedShowList);
// router.get("/?Completed=false" , getInCompletedShowList);

export default router;
