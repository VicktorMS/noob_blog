import express from "express";
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from "./config/db.js";
import postsRouter from "./routes/posts.route.js";
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5000;


const app = express();
app.use(cors()); 

const __dirname = path.resolve();
app.use(express.json()); 

app.get("/api/", (req, res) => {
    res.send("Hello World!");
})

app.use("/api/posts", postsRouter);

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,"frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server running on: http://localhost:" + PORT)
});