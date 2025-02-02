import express from "express"
import { createUser, getUser } from "../service/userService.js";


const testUserRouter = express.Router();

testUserRouter.post("/create", async (req,res) => {
    const { username, password } = req.body;
    try {
        createUser(username,password);
        res.status(200).json({success: true, data: null});
    } catch (error) {
        res.status(500).json({success: false, data: null});
    };
});

testUserRouter.get("/:username", async (req,res) => {
    try {
        const { username } = req.params;
        const user = await getUser(username);
        res.status(200).json({success: true, data: user});
    } catch (error) {
        res.status(500).json({success: false, data: null});
    };
});

export default testUserRouter;