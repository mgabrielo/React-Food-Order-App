import { MenuItem } from "@/app-types/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

type Props = {
  menuItem: MenuItem;
  addToCart: (menuItem: MenuItem) => void;
};

export const MenuItemDetail = ({ menuItem, addToCart }: Props) => {
  return (
    <Card className="cursor-pointer">
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold flex justify-between items-center">
        <div>£{(menuItem.price / 100).toFixed(2)}</div>
        <div>
          <Button
            onClick={() => addToCart(menuItem)}
            variant={"default"}
            className="bg-red-500 hover:bg-red-600"
          >
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
