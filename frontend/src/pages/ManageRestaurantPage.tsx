import {
  useCreateRestaurant,
  useGetRestaurant,
  useUpdateRestaurant,
} from "@/api/myRestaurantAPI";
import { ManageRestaurantForm } from "@/forms/manage-restaurant-form/ManageRestaurantForm";

export const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateRestaurant();
  const { restaurant, isLoading: isGetLoading } = useGetRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateRestaurant();
  const isRestaurantAvailable = restaurant !== undefined || restaurant;
  if (isGetLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={isRestaurantAvailable ? updateRestaurant : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
    />
  );
};
