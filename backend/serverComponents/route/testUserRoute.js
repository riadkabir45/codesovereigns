import express from "express";
import {
  createUser,
  getUser,
  getUsers,
  updateUserPassword,
} from "../service/userService.js";
import logger from "../config/logger.js";
import prisma from "../config/index.js";

const testUserRouter = express.Router();

testUserRouter.post("/create", async (req, res) => {
  const userData = await req.body;
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: userData.email }, { phone: userData.phone }],
    },
  });
  if (existingUser) {
    res.status(400).json({ success: false, error: "User already exists" });
    return;
  }
  try {
    const user = await createUser(userData);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, data: null });
    logger.error(error);
  }
});

testUserRouter.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await getUser(username);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, data: null });
    logger.error(error);
  }
});

testUserRouter.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, data: null });
    logger.error(error);
  }
});

testUserRouter.post("/update", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await updateUserPassword(username, password);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, data: null });
    logger.error(error);
  }
});

testUserRouter.post("/login", async (req, res) => {
  const { email, password } = await req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, error: "Email and password are required" });
    return;
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(404).json({ success: false, error: "User not found" });
      return;
    }
    if (user.password !== password) {
      res.status(401).json({ success: false, error: "Invalid password" });
      return;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, data: null });
    logger.error(error);
  }
});

export default testUserRouter;
