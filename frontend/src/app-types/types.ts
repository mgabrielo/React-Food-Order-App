export type User = {
  _id: string;
  email: string;
  name: string;
  city: string;
  addressLine: string;
  country: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type RestaurantSearchResult = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export type CheckoutSessionRequest = {
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

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export type Order = {
  _id: string;
  restaurant: Restaurant;
  user: User;
  deliveryDetails: {
    email: string;
    name: string;
    addressLine: string;
    city: string;
  };
  cartItems: {
    _id: string;
    menuItemId: string;
    quantity: Number;
    name: string;
  }[];
  totalAmount: Number;
  status: OrderStatus;
  createdAt: Date;
  restaurantId?: string;
};
