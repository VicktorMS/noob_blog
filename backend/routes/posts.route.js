import express from "express";
import { deletePostById, updatePost, getPosts, createPost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", createPost );
router.get("/", getPosts );
router.put("/:id", updatePost );
router.delete("/:id", deletePostById );

export default router;