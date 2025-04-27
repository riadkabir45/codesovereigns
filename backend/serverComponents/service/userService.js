import prisma from "../config/index.js";
import errorHandler from "../utils/errorHandler.js";

export const createUser = async (username, password) => {
  const updateUser = await prisma.user.create({
    data: {
      username,
      password,
    },
  });
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
