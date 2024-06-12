import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DetailsSection } from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import { CuisineSection } from "./CuisineSection";
import { MenuSection } from "./MenuSection";
import { ImageSection } from "./ImageSection";
import { LoadingButton } from "@/components/lib/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/app-types/types";
import { useEffect } from "react";

const formSchema = z
  .object({
    restaurantName: z
      .string({ required_error: "Restaurant Name is Required" })
      .min(1, { message: "restaurant name must be at least 1 character" }),
    city: z
      .string({ required_error: "City Name is Required" })
      .min(2, { message: "city must be at least 2 characters" }),
    country: z
      .string({ required_error: "Country Name is Required" })
      .min(2, { message: "country must be at least 2 characters" }),
    deliveryPrice: z.coerce.number({
      required_error: "Delivery Price is Required",
      invalid_type_error: "Must be a Valid Number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: " Estimated Delivery Time is Required",
      invalid_type_error: "Must be a Valid Number",
    }),
    cuisines: z
      .array(z.string())
      .nonempty({ message: "Please Select at Least One Item" }),
    menuItems: z.array(
      z.object({
        name: z
          .string()
          .min(2, { message: "menu item name must be at least 2 characters" }),
        price: z.coerce
          .number({ invalid_type_error: "Must be a Valid Number" })
          .min(1, { message: "menu price is required" }),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z
      .instanceof(File, { message: "Image File is Required" })
      .optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Image URL or image File must be Provided",
    path: ["imageFile"],
  });

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (RestaurantFormData: FormData) => void;
  isLoading: boolean;
  restaurant?: Restaurant;
};

export const ManageRestaurantForm = ({
  onSave,
  isLoading,
  restaurant,
}: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantName: restaurant?.restaurantName ?? "",
      city: restaurant?.city ?? "",
      country: restaurant?.country ?? "",
      deliveryPrice: 0,
      estimatedDeliveryTime: restaurant?.estimatedDeliveryTime ?? 0,
      cuisines: restaurant?.cuisines ?? [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!restaurant || restaurant == undefined) {
      // form.reset({});
      return;
    }
    const deliveryPriceFormated = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2)
    );
    const menuItemsFomratted = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));
    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormated,
      menuItems: menuItemsFomratted,
    };
    form.reset(updatedRestaurant);
  }, [form, restaurant]);
  const onSubmit = (data: RestaurantFormData) => {
    const formData = new FormData();
    formData.append("restaurantName", data.restaurantName);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("deliveryPrice", (data.deliveryPrice * 100).toString());
    formData.append(
      "estimatedDeliveryTime",
      data.estimatedDeliveryTime.toString()
    );
    data.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    data.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });
    if (data.imageFile) {
      formData.append("imageFile", data.imageFile);
    }
    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-100 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisineSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};
