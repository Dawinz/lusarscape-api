import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js"
import categoryRoutes from "./routes/category.js";
import postRoutes from "./routes/post.js";
import websiteRoutes from "./routes/website.js";

import morgan from 'morgan';

const app = express();
import { createServer } from 'http';
const http = createServer(app);

// db connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: 'https://lusarscape.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  // Enable CORS credentials if needed (cookies, authentication headers, etc.)
  optionsSuccessStatus: 204,  // Respond with 204 No Content for preflight requests
};
app.use(cors(corsOptions));
app.use(morgan("dev"));

// route middlewares
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", postRoutes);
app.use("/api", websiteRoutes);

const port = process.env.PORT || 8000;

http.listen(port, () => console.log("Server running on port 8000"));
