import prisma from "../config/index.js";
import errorHandler from "../utils/errorHandler.js";

export const addUpdateCart = async (req, res) => {
  const cart = await req.body;
  let { userId, productId, orderId, productPrice } = cart;

  if (!userId || !productId) {
    return res.status(400).json({
      success: false,
      message: "userId and productId are required",
    });
  }

  if (!productPrice) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    productPrice = product.price;
  }

  if (!orderId) {
    let order = await prisma.order.findFirst({
      where: { userId: userId, status: "UNPAID" },
    });
    if (!order) {
      order = await prisma.order.create({
        data: {
          userId,
          total: productPrice,
        },
      });
    } else {
      order = await prisma.order.update({
        where: { id: order.id },
        data: {
          total: order.total + productPrice,
        },
      });
    }

    orderId = order.id;
  }

  let cartItem = await errorHandler(
    prisma.cart.findFirst({
      where: { orderId: orderId, productId: productId },
    })
  );

  if (!cartItem) {
    cartItem = await prisma.cart.create({
      data: {
        userId,
        orderId,
        productId,
        price: productPrice,
      },
      
    });
  } else {
    cartItem = await prisma.cart.update({
      where: { id: cartItem.id },
      data: {
        quantity: {
          increment: 1,
        },
        price: {
          increment: productPrice,
        },
      },
    });
  }

  res.status(200).json({ success: true, data: cartItem });
};

export const incrementCartQuantity = async (req, res) => {
  let { cartId, orderId, productPrice } = req.body;
  if (!cartId) {
    return res.status(400).json({
      success: false,
      message: "cartId is required",
    });
  }
  const cartItem = await prisma.cart.findUnique({
    where: { id: cartId },
  });

  if (!cartItem) {
    return res
      .status(404)
      .json({ success: false, message: "Cart item not found" });
  }
  if (!productPrice) {
    let product = await prisma.product.findUnique({
      where: { id: cartItem.productId },
    });
    productPrice = product.price;
  }

  const updatedCartItem = await prisma.cart.update({
    where: { id: cartId },
    data: {
      quantity: {
        increment: 1,
      },
      price: {
        increment: productPrice,
      },
    },
  });

  if (!orderId) {
    let order = await prisma.order.findFirst({
      where: { id: cartItem.orderId },
    });

    orderId = order.id;
  }
  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: {
      total: {
        increment: productPrice,
      },
    },
  });

  res
    .status(200)
    .json({ success: true, data: { updatedCartItem, updatedOrder } });
};

export const decrementCartQuantity = async (req, res) => {
  let { cartId, productPrice, orderId } = req.body;

  if (!cartId) {
    return res.status(400).json({
      success: false,
      message: "cartId is required",
    });
  }
  const cartItem = await prisma.cart.findUnique({
    where: { id: cartId },
  });

  if (!cartItem) {
    return res
      .status(404)
      .json({ success: false, message: "Cart item not found" });
  }

  if (!productPrice) {
    const product = await prisma.product.findUnique({
      where: { id: cartItem.productId },
    });
    productPrice = product.price;
  }
  if (!orderId) {
    let order = await prisma.order.findFirst({
      where: { id: cartItem.orderId },
    });

    orderId = order.id;
  }

  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: {
      total: {
        decrement: productPrice,
      },
    },
  });

  const updatedQuantity = cartItem.quantity - 1;
  if (updatedQuantity <= 0) {
    await prisma.cart.delete({
      where: { id: cartId },
    });
    return res.status(200).json({ success: true, data: { updatedOrder } });
  } else {
    const updatedCartItem = await prisma.cart.update({
      where: { id: cartId },
      data: { quantity: updatedQuantity, price: { decrement: productPrice } },
    });

    res
      .status(200)
      .json({ success: true, data: { updatedCartItem, updatedOrder } });
  }
};

// As an engineer describe your role in project planning and management
