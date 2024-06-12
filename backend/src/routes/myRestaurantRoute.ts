import express from "express";
import multer from "multer";
import {
  createRestaurant,
  getRestaurant,
  updateRestaurant,
} from "../controllers/myRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
  },
});

router.get("/", jwtCheck, jwtParse, getRestaurant);

router.post(
  "/",
  upload.single("imageFile"),
  validateRestaurantRequest,
  jwtCheck,
  jwtParse,
  createRestaurant
);

router.put(
  "/",
  upload.single("imageFile"),
  validateRestaurantRequest,
  jwtCheck,
  jwtParse,
  updateRestaurant
);

export default router;
