import { Restaurant } from "@/app-types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

export const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <Card className="border border-1 border-slate-400 shadow-md bg-white">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription>
          {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {restaurant.cuisines.length > 0 &&
          restaurant.cuisines.map((cuisine, index) => (
            <span className="flex" key={index}>
              {index <= restaurant.cuisines.length - 1 && <Dot />}
              <span>{cuisine}</span>
            </span>
          ))}
      </CardContent>
    </Card>
  );
};
