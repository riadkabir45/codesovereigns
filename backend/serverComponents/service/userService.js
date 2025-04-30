import prisma from "../config/index.js";
import errorHandler from "../utils/errorHandler.js";

export const createUser = async (data) => {
  console.log(data);
  const updateUser = await errorHandler(
    prisma.user.create({
      data,
    })
  );
  return updateUser;
};

export const getUsers = async () => {
  const users = await errorHandler(prisma.user.findMany());
  return users;
};

export const getUser = async (username) => {
  const user = await errorHandler(
    prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        cart: true,
        orders: true,
      },
    })
  );
  return user;
};

export const updateUserPassword = async (username, password) => {
  const user = await errorHandler(
    prisma.user.update({
      where: {
        username,
      },
      data: {
        password,
      },
    })
  );
  return user;
};
