import axios from "axios";
export async function getCartItems(userId) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/orders/unpaid/${userId}`
    );
    const data = response.data;
    if (!data?.success) {
      throw new Error("Failed to fetch cart items");
    }
    return data.data;
  } catch (error) {
    console.error("Error in getCartItems:", error);
    throw new Error("Failed to fetch cart items");
  }
}
export async function addToCarts(item) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/cart`,
      item
    );
    const data = response.data;
    if (!data?.success) {
      throw new Error("Failed to add item to cart");
    }
    return data.data;
  } catch (error) {
    console.error("Error in addToCart:", error);
    throw new Error("Failed to add item to cart");
  }
}
export async function addQuantity(cartId) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/cart/add-quantity`,
      cartId
    );
    const data = response.data;
    if (!data?.success) {
      throw new Error("Failed to add item to cart");
    }
    return data.data;
  } catch (error) {
    console.error("Error in addToCart:", error);
    throw new Error("Failed to add item to cart");
  }
}
export async function removeQuantity(cartId) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/cart/remove-quantity`,
      cartId
    );
    const data = response.data;
    if (!data?.success) {
      throw new Error("Failed to add item to cart");
    }
    return data.data;
  } catch (error) {
    console.error("Error in addToCart:", error);
    throw new Error("Failed to add item to cart");
  }
}
