import { Router } from "express";
import {
  getUnpaidOrder,
  getUserOrders,
  makePaidOrder,
} from "../controller/orderControler.js";

const orderRouter = Router();

orderRouter.get("/all/:userId", getUserOrders);
orderRouter.get("/unpaid/:userId", getUnpaidOrder);
orderRouter.post("/makePaid", makePaidOrder);

export default orderRouter;
