import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/authRoute.js";
import expenseRoute from "./Routes/expenseRoute.js";
import userRoute from "./Routes/userRoute.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("api is working");
});

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("mongoDb connected");
  } catch (error) {
    console.log("mongoDb connection failed ::####", error);
  }
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/expen", expenseRoute);

app.listen(port, () => {
  connectDB();
  console.log(`app is listening on ${port}`);
});
