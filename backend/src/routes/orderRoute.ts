import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import {
  createCheckOutSession,
  stripeWebHook,
  getMyUserOrder,
} from "../controllers/orderController";

const router = express.Router();

router.get("/", jwtCheck, jwtParse, getMyUserOrder);

router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtParse,
  createCheckOutSession
);

router.post("/checkout/webhook", stripeWebHook);
export default router;
