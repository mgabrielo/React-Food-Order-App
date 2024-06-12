import { useGetRestaurantDetail } from "@/api/RestaurantAPI";
import { useCheckoutSession } from "@/api/orderAPI";
import { CartItem, MenuItem } from "@/app-types/types";
import { CheckOutButton } from "@/components/lib/CheckOutButton";
import { MenuItemDetail } from "@/components/lib/MenuItem";
import { OrderSummary } from "@/components/lib/OrderSummary";
import { RestaurantInfo } from "@/components/lib/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurantDetail(restaurantId);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const { createSessionCheckout, isLoading: checkoutLoading } =
    useCheckoutSession();

  if (isLoading || restaurant === undefined || !restaurant) {
    return <>Loading...</>;
  }

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prev) => {
      const existingCartItem = prev.find((item) => item._id === menuItem._id);
      let updatedCartItems;
      if (existingCartItem) {
        updatedCartItems = prev.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prev,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prev) => {
      const filteredCartItems = prev.filter(
        (item) => item._id !== cartItem._id
      );
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(filteredCartItems)
      );

      return filteredCartItems;
    });
  };

  const onCheckOut = async (userFormData: UserFormData) => {
    if (!restaurant) {
      console.log("no restaurant available");
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      deliveryDetails: {
        email: userFormData.email as string,
        name: userFormData.name,
        addressLine: userFormData.addressLine,
        city: userFormData.city,
      },
      restaurantId: restaurant._id,
    };

    const data = await createSessionCheckout(checkoutData);
    if (data.url) {
      window.location.href = data?.url;
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 10}>
        <img
          className="rounded-md object-cover size-full"
          src={restaurant.imageUrl}
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-30">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem, index) => (
            <MenuItemDetail
              key={index}
              menuItem={menuItem}
              addToCart={addToCart}
            />
          ))}
        </div>

        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckOutButton
                disabled={cartItems.length === 0}
                onCheckOut={onCheckOut}
                isLoading={checkoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
