import { Order } from "@/app-types/types";
import { Separator } from "../ui/separator";
type Props = {
  order: Order;
};
export const OrderStatusDetail = ({ order }: Props) => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className="font-bold">Delivering to:</span>
        <span>{order.deliveryDetails.name}</span>
        <span>{order.deliveryDetails.addressLine}</span>
      </div>

      <div className="flex flex-col">
        <span className="font-bold">Your Order:</span>
        <ul>
          {order.cartItems.map((item, idx) => (
            <li key={idx}>
              {item.name} x {item.quantity as number}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold">Total</span>
        <span>£{((order.totalAmount as number) / 100).toFixed(2)}</span>
      </div>
    </div>
  );
};
