import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import questionRoutes from "./routes/question.routes";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Himoya: HTTP headerlarini sozlash
app.use(helmet());

// Himoya: Rate limiting (Bir IP dan keladigan so'rovlarni cheklash)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 daqiqa
  max: 100, // har bir IP dan 100 ta so'rov
  message: "Juda ko'p so'rov yuborildi. Iltimos, keyinroq urinib ko'ring."
});
app.use(limiter);

app.use(cors());
app.use(express.json());

app.use("/api/questions", questionRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Prava2026 API ishlayapti!" });
});

const PORT = process.env.PORT || 3001;

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server ${PORT}-portda ishga tushdi`);
});