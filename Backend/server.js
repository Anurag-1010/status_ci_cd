import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js";

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected")).catch(()=>console.log("Not connected to MongoDB"));

app.use("/api/auth", authRoutes);

app.listen(5000, () =>
  console.log("Server running on port 5000")
);