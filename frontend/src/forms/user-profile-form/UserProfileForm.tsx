import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/lib/LoadingButton";
import { Button } from "@/components/ui/button";
import { User } from "@/app-types/types";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(2, "name is required"),
  addressLine: z.string().min(2, "addressLine is required"),
  city: z.string().min(2, "city is required"),
  country: z.string().min(2, "country is required"),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  currentUser: User;
  title?: string;
  buttonText?: string;
};

export const UserProfileForm = ({
  onSave,
  isLoading,
  currentUser,
  title = "User Profile Form",
  buttonText = "Save",
}: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: currentUser.email ?? "",
      name: currentUser.name ?? "",
      addressLine: currentUser.addressLine ?? "",
      city: currentUser.city ?? "",
      country: currentUser.country ?? "",
    },
  });

  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-3 bg-gray-100 rounded-lg p-5 md:p-10"
      >
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <FormDescription>
            View and Change Your Profile Informaation
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="addressLine"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Address Line</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-orange-500">
            {buttonText}
          </Button>
        )}
      </form>
    </Form>
  );
};
