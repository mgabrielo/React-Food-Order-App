import { Request, Response } from "express";
import Stripe from "stripe";
import Restaurant, { MenuItemType } from "../models/restaurant";
import Order from "../models/order";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const STRIPE_WEBOHOOK_SECRET = process.env.STRIPE_WEBOHOOK_SECRET as string;
const FRONTEND_URL = process.env.FRONTEND_URL as string;

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine: string;
    city: string;
  };
  restaurantId: string;
};

export const getMyUserOrder = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate("restaurant")
      .populate("user");
    if (!orders) {
      return res.status(404).json({ message: "Order Details Not Found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.log(`Restaurant Order Error - ${error}`);
    res.status(500).json({ error: "Error Handling Details" });
  }
};

export const stripeWebHook = async (req: Request, res: Response) => {
  // console.log("received event-:", req.body);
  let event;
  try {
    const stripeSignature = req.headers["stripe-signature"];
    event = STRIPE.webhooks.constructEvent(
      req.body,
      stripeSignature as string,
      STRIPE_WEBOHOOK_SECRET
    );
  } catch (error: any) {
    console.log(error);
    return res.status(400).send(`webhook error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const order = await Order.findById(event.data.object.metadata?.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order Details Not Found" });
    }
    order.totalAmount = event.data.object.amount_total;
    order.status = "paid";
    await order.save();
    res.sendStatus(200);
  }
};

export const createCheckOutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionReq: CheckoutSessionRequest = req.body;
    const restaurant = await Restaurant.findById(
      checkoutSessionReq.restaurantId
    );

    if (!restaurant || !req.userId) {
      return res.status(404).json({ message: "Restaurant Details Not Found" });
    }

    const newOrder = await new Order({
      restaurant: restaurant,
      user: req.userId,
      status: "placed",
      deliveryDetails: checkoutSessionReq.deliveryDetails,
      cartItems: checkoutSessionReq.cartItems,
      createdAt: new Date(),
    });
    const lineItems = createLineItems(checkoutSessionReq, restaurant.menuItems);
    const session = await createSession(
      lineItems,
      newOrder._id.toString(),
      restaurant.deliveryPrice,
      restaurant._id.toString()
    );

    if (!session?.url) {
      return res.status(400).json({ error: "Error Handling Session URL" });
    }

    await newOrder.save();
    return res.json({ url: session.url });
  } catch (error: any) {
    console.log(`Checkout Restaurant Error - ${error}`);
    res.status(500).json({ error: "Error Handling Details" });
  }
};

const createLineItems = (
  checkoutReq: CheckoutSessionRequest,
  menuItems: MenuItemType[]
) => {
  try {
    const lineItems = checkoutReq.cartItems.map((cartItem) => {
      const menuItem = menuItems.find(
        (menuItem) => menuItem._id.toString() === cartItem.menuItemId.toString()
      );
      if (!menuItem) {
        throw new Error("Menu Item Not Found");
      }
      const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
        price_data: {
          currency: "gbp",
          unit_amount: menuItem.price,
          product_data: {
            name: menuItem.name,
          },
        },
        quantity: parseInt(cartItem.quantity),
      };
      return line_item;
    });
    return lineItems;
  } catch (error) {
    throw new Error("Error Creating Line Items");
  }
};

const createSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string,
  deliveryPrice: number,
  restaurantId: string
) => {
  try {
    const sessionData = await STRIPE.checkout.sessions.create({
      line_items: lineItems,
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Delivery",
            type: "fixed_amount",
            fixed_amount: {
              amount: deliveryPrice,
              currency: "gbp",
            },
          },
        },
      ],
      mode: "payment",
      metadata: {
        orderId,
        restaurantId,
      },
      success_url: `${FRONTEND_URL}/order-details?success=true`,
      cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
    });
    return sessionData;
  } catch (error) {
    throw new Error("Error Creating Session");
  }
};
