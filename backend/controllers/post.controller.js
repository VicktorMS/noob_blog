import mongoose, { get } from "mongoose";
import Post from "../models/post.model.js";


export const deletePostById = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(req.query.author)) {
        return res.status(400).json({success: false, message: "Invalid Post ID" });
    }

    try {
        await Post.findByIdAndDelete(id);
        res.status(204).json({success: true});
    } catch (error) {
        res.status(500).json({success: false, message: error });
    }
}

export const createPost = async (req, res) => {
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
}


export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({success: true, data: posts });
    } catch (error) {
        res.status(500).json({success: false, message: error });
    }
}

export const updatePost = async (req, res) => {
    const {id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(req.query.author)) {
        return res.status(404).json({success: false, message: "Invalid Post ID" });
    }

    if (!post.title || !post.content || !post.author) {
        return res.status(400).json({success: false, message: "Missing title, content or author" });
    }
    try {
        const updatedPost = await Post.findByIdAndUpdate(id, post, {new: true});
        res.status(200).json({success: true, data: updatedPost });
    } catch (error) {
        res.status(500).json({success: false, message: error });
    }
}