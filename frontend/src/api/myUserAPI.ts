import { User } from "@/app-types/types";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL!;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createUserRequest = async (user: CreateUserRequest) => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/user/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      throw new Error("Not Able to Create User");
    }
  };
  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createUserRequest);
  return { createUser, isLoading, isError, isSuccess };
};

export const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateUserRequest = async (formData: UserFormData) => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/user/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      throw new Error("Not Able to Update User");
    }
  };
  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    reset,
    error,
  } = useMutation(updateUserRequest);

  if (isSuccess) {
    toast.success("User Profile Updated");
  }

  if (error) {
    toast.error(error.toString());
    reset(); // to clear error state
  }

  return { updateUser, isLoading };
};

export const useGetUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getUserRequest = async (): Promise<User> => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/user/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Not Able to Get User");
    }
    return res.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getUserRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isLoading };
};
