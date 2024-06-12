import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth0 } from "@auth0/auth0-react";

export const MobileNavLinks = () => {
  const { logout } = useAuth0();
  return (
    <>
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        User Profile
      </Link>
      <Link
        to="/order-details"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        Orders
      </Link>
      <Link
        to="/manage-restaurant"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        Manage Restaurant
      </Link>
      <Button
        onClick={() => logout()}
        className="flex bg-black text-white items-center font-bold hover:bg-orange-500 hover:text-white"
      >
        Log Out
      </Button>
    </>
  );
};
