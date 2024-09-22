import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();


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
        res.status(201).json({success: true, message: "Post created successfully" });
    } catch (error) {
        console.log(error); // Remover em prod
        res.status(500).json({success: false, message: "Failed to create post" });
    }
})

app.listen(5000, () => {
    connectDB();
    console.log("Server running on port 5000: http://localhost:5000")
});