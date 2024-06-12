import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidatonErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateUserRequest = [
  body("name").isString().notEmpty().withMessage("Name is required"),
  body("addressLine")
    .isString()
    .notEmpty()
    .withMessage("Address Line is required"),
  body("city").isString().notEmpty().withMessage("city is required"),
  body("country").isString().notEmpty().withMessage("country is required"),
  handleValidatonErrors,
];

export const validateRestaurantRequest = [
  body("restaurantName")
    .isString()
    .notEmpty()
    .withMessage("restaurant name is required"),
  body("city").isString().notEmpty().withMessage("restaurant city is required"),
  body("country")
    .isString()
    .notEmpty()
    .withMessage("restaurant country is required"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery Price Must be a positive real number"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated Delivery Time Must be a positive real number"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be array")
    .not()
    .isEmpty()
    .withMessage("Cuisines Array must not be empty"),
  body("menuItems").isArray().withMessage("Menu Items must be array"),
  body("menuItems.*.name")
    .isString()
    .notEmpty()
    .withMessage("menu item name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .notEmpty()
    .withMessage("menu item price is required"),
  handleValidatonErrors,
];
