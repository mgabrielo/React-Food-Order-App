import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export const UserNameMenu = () => {
  const { user, logout } = useAuth0();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 text-orange-600 font-bold hover:text-black gap-2">
        <CircleUserRound className="text-orange-600" />
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            to="/user-profile"
            className="font-bold text-orange-500 hover:text-black"
          >
            User Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to="/manage-restaurant"
            className="font-bold text-orange-500 hover:text-black"
          >
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className="flex flex-1 font-bold bg-orange-500"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
