import express from "express";
import { param } from "express-validator";
import {
  searchRestaurant,
  detailRestaurant,
} from "../controllers/restaurantController";

const router = express.Router();

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City Parameter must be a string"),
  searchRestaurant
);

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Restaurant Parameter must be a string"),
  detailRestaurant
);

export default router;
