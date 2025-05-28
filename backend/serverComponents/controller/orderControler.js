import prisma from "../config/index.js";
import errorHandler from "../utils/errorHandler.js";

export const getUserOrders = async (req, res) => {
  const { userId } = req.params;
  const orders = await errorHandler(
    prisma.order.findMany({
      where: { userId },
      include: {
        cart: {
          include: {
            product: true,
          },
        },
      },
    })
  );
  if (!orders.length) {
    return res.status(404).json({ success: false, message: "No orders found" });
  }
  res.status(200).json({ success: true, data: orders });
};

export const getUnpaidOrder = async (req, res) => {
  const { userId } = req.params;
  const unPaidOrder = await errorHandler(
    prisma.order.findFirst({
      where: { userId, status: "UNPAID" },
      include: {
        cart: {
          include: {
            product: true,
          },
        },
      },
    })
  );
  if (!unPaidOrder) {
    return res
      .status(404)
      .json({ success: false, message: "No unpaid order found" });
  }
  res.status(200).json({ success: true, data: unPaidOrder });
};

export const makePaidOrder = async (req, res) => {
  const { orderId } = req.body;
  if (!orderId) {
    return res
      .status(400)
      .json({ success: false, message: "orderId is required" });
  }
  const order = await errorHandler(
    prisma.order.update({
      where: { id: orderId },
      data: { status: "PAID" },
    })
  );
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }
  res.status(200).json({ success: true, data: order });
};
