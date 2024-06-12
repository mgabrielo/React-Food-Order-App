import { useGetUser, useUpdateUser } from "@/api/myUserAPI";
import { UserProfileForm } from "@/forms/user-profile-form/UserProfileForm";

export const UserProfilePage = () => {
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();
  const { currentUser, isLoading } = useGetUser();

  if (isLoading) {
    return <span>Loading ...</span>;
  }

  if (!currentUser) {
    return <span>Unable to Load User Details</span>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isLoading || isUpdateLoading}
    />
  );
};
