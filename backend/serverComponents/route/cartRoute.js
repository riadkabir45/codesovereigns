import express from "express";
import {
  addUpdateCart,
  decrementCartQuantity,
  incrementCartQuantity,
} from "../controller/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/", addUpdateCart);
cartRouter.put("/add-quantity", incrementCartQuantity);
cartRouter.put("/remove-quantity", decrementCartQuantity);

export default cartRouter
