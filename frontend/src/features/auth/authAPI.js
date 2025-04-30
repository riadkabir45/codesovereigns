import axios from "axios";

export const registerApi = async (userData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/users/create`,
      userData
    );
    const data = response.data;
    if (!data?.success) {
      throw new Error("Failed to register user");
    }
    console.log("User registered successfully:", data.data);
    return data.data;
  } catch (error) {
    console.error("Error in registerApi:", error);
    throw new Error("Failed to register user");
  }
};

export const loginApi = async (userData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/users/login`,
      userData
    );
    const data = response.data;
    if (!data?.success) {
      throw new Error("Failed to login user");
    }
    return data.data;
  } catch (error) {
    console.error("Error in loginApi:", error);
    throw new Error("Failed to login user");
  }
};
