import { Order } from "@/app-types/types";
type Props = {
  order: Order;
};
export const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);
    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );
    const hours = created.getHours();
    const minutes = created.getMinutes();
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${paddedMinutes}`;
  };
  return (
    <>
      <h1 className="text-4xl tracking-tight flex flex-col font-bold md:flex-row md:justify-between gap-5">
        <span>Order Status :</span>
        <span>Expected Time: {getExpectedDelivery()}</span>
      </h1>
    </>
  );
};
