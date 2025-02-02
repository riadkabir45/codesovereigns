import express from "express"
import { createUser, getUser, getUsers, updateUserPassword } from "../service/userService.js";
import logger from "../config/logger.js";


const testUserRouter = express.Router();

testUserRouter.post("/create", async (req,res) => {
    const { username, password } = req.body;
    try {
        await createUser(username,password);
        res.status(200).json({success: true, data: null});
    } catch (error) {
        res.status(500).json({success: false, data: null});
        logger.error(error);
    };
});

testUserRouter.get("/:username", async (req,res) => {
    try {
        const { username } = req.params;
        const user = await getUser(username);
        res.status(200).json({success: true, data: user});
    } catch (error) {
        res.status(500).json({success: false, data: null});
        logger.error(error);
    };
});

testUserRouter.get("/", async (req,res) => {
    try {
        const users = await getUsers();
        res.status(200).json({success: true, data: users});
    } catch (error) {
        res.status(500).json({success: false, data: null});
        logger.error(error);
    };
});


testUserRouter.post("/update", async (req,res) => {
    const { username, password } = req.body;
    try {
        const user = await updateUserPassword(username,password);
        res.status(200).json({success: true, data: user});
    } catch (error) {
        res.status(500).json({success: false, data: null});
        logger.error(error);
    };
});
export default testUserRouter;