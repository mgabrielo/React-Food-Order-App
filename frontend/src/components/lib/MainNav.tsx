import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../ui/button";
import { UserNameMenu } from "./UserNameMenu";
import { Link } from "react-router-dom";

export const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          <Link to="order-details" className="font-bold text-orange-500 ">
            Orders
          </Link>
          <UserNameMenu />
        </>
      ) : (
        <Button
          variant={"ghost"}
          className="font-bold text-orange-500 hover:text-black hover:bg-white"
          onClick={async () => loginWithRedirect()}
        >
          Login
        </Button>
      )}
    </span>
  );
};
