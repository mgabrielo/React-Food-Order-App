import { Restaurant } from "@/app-types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL!;

export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/restaurant/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: restaurantFormData,
    });
    if (!res.ok) {
      throw new Error("Not Able to Create Restaurant");
    }
    return res.json();
  };
  const {
    mutateAsync: createRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(createRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant Created Successfully");
  }

  if (error) {
    toast.error(error.toString());
  }

  return { createRestaurant, isLoading };
};

export const useGetRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getRestaurantRequest = async (): Promise<Restaurant> => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/restaurant/`, {
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

  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurant",
    getRestaurantRequest,
    {
      onError: (err) => {
        console.error(err);
      },
    }
  );

  return { restaurant, isLoading };
};

export const useUpdateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/restaurant/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: restaurantFormData,
    });
    if (!res.ok) {
      throw new Error("Not Able to Update Restaurant");
    }
    return res.json();
  };
  const {
    mutateAsync: updateRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant Updated Successfully");
  }

  if (error) {
    toast.error(error.toString());
  }

  return { updateRestaurant, isLoading };
};
