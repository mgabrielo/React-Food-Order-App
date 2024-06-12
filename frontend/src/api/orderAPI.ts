import { CheckoutSessionRequest, Order } from "@/app-types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL!;

export const useCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckOutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const token = await getAccessTokenSilently();
    const res = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );
    if (!res.ok) {
      console.error("Not Able to Checkout From Restaurant");
    }
    return res.json();
  };

  const {
    mutateAsync: createSessionCheckout,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckOutSessionRequest);

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { createSessionCheckout, isLoading };
};

export const useGetOrders = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getOrderRequest = async (): Promise<Order[]> => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/order/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return res.json();
  };

  const { data: orders, isLoading } = useQuery("fetchOrders", getOrderRequest, {
    onError: (err) => {
      console.error(err);
    },
  });

  return { orders, isLoading };
};
