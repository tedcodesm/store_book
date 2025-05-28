import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js"
import bookRoutes from "./routes/books.js"
import bookRoutesVolume from "./routes/bookRoutes.js"
import { connectDB } from "./lib/db.js";
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use("/api/auth",authRoutes);
app.use("/api/books",bookRoutes);
app.use("/api/volume",bookRoutesVolume);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
