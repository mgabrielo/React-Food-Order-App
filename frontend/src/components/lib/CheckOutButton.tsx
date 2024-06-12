import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { LoadingButton } from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { UserProfileForm } from "@/forms/user-profile-form/UserProfileForm";
import { useGetUser } from "@/api/myUserAPI";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";

type Props = {
  onCheckOut: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

export const CheckOutButton = ({
  onCheckOut,
  disabled,
  isLoading: isCheckoutLoading,
}: Props) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { pathname } = useLocation();
  const { currentUser, isLoading: isUserLoading } = useGetUser();
  const onSignIn = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };
  if (!isAuthenticated || !currentUser) {
    return (
      <Button onClick={onSignIn} className="bg-orange-500 text-white w-full">
        {" "}
        Log In to Check Out
      </Button>
    );
  }

  if (isLoading || !currentUser || isCheckoutLoading) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col w-full">
          <Button disabled={disabled} className="bg-orange-500 w-full">
            Go To Checkout
          </Button>
          {disabled && (
            <span className="text-sm text-red-500 mt-3">
              please add check-out items to proceed
            </span>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] md:max-w-[75%] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser}
          onSave={(data) => onCheckOut(data)}
          isLoading={isUserLoading}
          title="Confirm Delivery Details"
          buttonText="Continue to Payment"
        />
      </DialogContent>
    </Dialog>
  );
};
