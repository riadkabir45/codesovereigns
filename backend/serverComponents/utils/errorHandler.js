const errorHandler = async (promise) => {
  try {
    return await promise;
  } catch (error) {
    console.error("Error: ", error);
    return { success: false, data: null };
  }
};

export default errorHandler;
