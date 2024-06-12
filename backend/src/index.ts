import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import myUserRoute from "./routes/myUserRoute";
import myRestaurantRoute from "../src/routes/myRestaurantRoute";
import restaurantRoute from "../src/routes/restaurantRoute";
import orderRoute from "../src/routes/orderRoute";

const app = express();
mongoose.connect(process.env.MONGODB_URI as string).then(() => {
  console.log("Connected to the MongoDB Database");
});

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());
app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));
app.use(express.json());
app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);

app.listen(5000, () => {
  console.log("Server Running on localhost:5000");
});
