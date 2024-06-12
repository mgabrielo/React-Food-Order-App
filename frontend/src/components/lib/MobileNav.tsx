import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { CircleUserRound, Menu } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { MobileNavLinks } from "./MobileNavLinks";

export const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center p-0">
        <Menu className="text-orange-500 size-6" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {isAuthenticated ? (
            <span className="flex items-center font-bold gap-2">
              <CircleUserRound className="text-orange-500" />
              {user?.email}
            </span>
          ) : (
            <span>Welcome to GreatEats.com</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-3">
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            <Button
              onClick={async () => loginWithRedirect()}
              className="flex-1 bg-orange-500 font-bold text-white"
            >
              Log In
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
