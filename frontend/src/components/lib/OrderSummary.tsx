import { CartItem, Restaurant } from "@/app-types/types";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { useMemo } from "react";
import { Trash2 } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

export const OrderSummary = ({
  restaurant,
  cartItems,
  removeFromCart,
}: Props) => {
  const getTotalCost = () => {
    const totalInPence = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const totalWithDelivery = totalInPence + restaurant.deliveryPrice;
    return (totalWithDelivery / 100).toFixed(2);
  };
  const total = useMemo(() => getTotalCost(), [cartItems]);
  return (
    <>
      <>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight flex justify-between">
            <span>Your Order</span>
            <span>£{total}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {cartItems.length > 0 &&
            cartItems.map((cartItem, index) => (
              <div key={index} className="flex justify-between w-full">
                <span className="flex-1">
                  <Badge
                    variant={"outline"}
                    className="border border-orange-500 mr-2"
                  >
                    {cartItem.quantity}
                  </Badge>
                  {cartItem.name}
                </span>
                <span className="flex items-center">
                  £{((cartItem.price * cartItem.quantity) / 100).toFixed(2)}
                </span>
                <span className="p-0 pl-3 self-center">
                  <Trash2
                    className="size-5 text-red-500 cursor-pointer"
                    onClick={() => removeFromCart(cartItem)}
                  />
                </span>
              </div>
            ))}
          <Separator />
          <div className="flex justify-between">
            <span>Delivery Price</span>
            <span>£{(restaurant.deliveryPrice / 100).toFixed(2)}</span>
          </div>
          <Separator />
        </CardContent>
      </>
    </>
  );
};
