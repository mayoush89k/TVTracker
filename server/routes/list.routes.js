import { Router } from "express";
import {
  addNewItem,
  getItems,
  getItemById,
  updateItemById,
  deleteItemById,
} from "../controller/list.Controller.js";


const router = Router();

router.get("/" , getItems);
router.post("/" , addNewItem);
router.get("/:id" , getItemById);
router.put("/:id" , updateItemById);
router.delete("/:id" , deleteItemById);

export default router;