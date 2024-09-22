import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import postsRouter from "./routes/posts.route.js";

dotenv.config();

const app = express();


app.use(express.json()); 

app.get("/api/", (req, res) => {
    res.send("Hello World!");
})

app.use("/api/posts", postsRouter);


app.listen(5000, () => {
    connectDB();
    console.log("Server running on port 5000: http://localhost:5000")
});