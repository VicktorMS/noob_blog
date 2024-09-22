import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import Post from "./models/post.model.js";

dotenv.config();

const app = express();


app.use(express.json()); // Allows us to accept JSON data in the body of the request

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.post("/posts", async (req, res) => {
    const post = req.body;

    if (!post.title || !post.content || !post.author) {
        return res.status(400).json({success: false, message: "Missing title, content or author" });
    }

    const newPost = new Post(post);

    try {
        await newPost.save();
        res.status(201).json({success: true, data: newPost });
    } catch (error) {
        res.status(500).json({success: false, message: "Failed to create post" });
    }
})

app.delete("/posts/:id", async (req, res) => {
    const {id} = req.params;

    try {
        await Post.findByIdAndDelete(id);
        res.status(204).json({success: true});
    } catch (error) {
        res.status(500).json({success: false, message: error });
    }
})

app.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({success: true, data: posts });
    } catch (error) {
        res.status(500).json({success: false, message: error });
    }
})

app.put("/posts/:id", async (req, res) => {
    const {id} = req.params;
    const post = req.body;
    if (!post.title || !post.content || !post.author) {
        return res.status(400).json({success: false, message: "Missing title, content or author" });
    }
    try {
        const updatedPost = await Post.findByIdAndUpdate(id, post, {new: true});
        res.status(200).json({success: true, data: updatedPost });
    } catch (error) {
        res.status(500).json({success: false, message: error });
    }
})


app.listen(5000, () => {
    connectDB();
    console.log("Server running on port 5000: http://localhost:5000")
});