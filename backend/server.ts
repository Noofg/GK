import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import projectRoutes from "./routes/projectRoutes"
import uploadRoutes from "./middleware/upload";

dotenv.config();
connectDB();

const app = express();

app.use(cors({origin:"*"}));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Server is running!");
  });

app.use("/auth", authRoutes);
app.use("/project", projectRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
export { app };