import { useGetOrders } from "@/api/orderAPI";
import { OrderStatusDetail } from "@/components/lib/OrderStatusDetail";
import { OrderStatusHeader } from "@/components/lib/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const OrderDetailsPage = () => {
  const { orders, isLoading } = useGetOrders();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!orders || orders === undefined || orders.length === 0) {
    return <>No Orders Found</>;
  }
  return (
    <div>
      {orders.length > 0 &&
        orders.map((order, idx) => (
          <div key={idx} className="space-y-10 bg-gray-50 p-10 rounded-lg">
            <OrderStatusHeader order={order} />
            <div className="grid gap-10 md:grid-cols-2">
              <OrderStatusDetail order={order} />
              <AspectRatio ratio={16 / 10}>
                <img
                  src={order.restaurant.imageUrl}
                  className="rounded-md object-cover size-full"
                />
              </AspectRatio>
            </div>
          </div>
        ))}
    </div>
  );
};
