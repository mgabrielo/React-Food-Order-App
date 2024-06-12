import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import { MenuItemInput } from "./MenuItemInput";

export const MenuSection = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "menuItems",
  });
  return (
    <div className="space-y-2">
      <div className="">
        <h2 className="text-2xl font-bold">Menu</h2>
        <FormDescription>create your menu with price tags</FormDescription>
      </div>
      <FormField
        control={control}
        name="menuItems"
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {fields.map((_, index) => (
              <MenuItemInput
                key={index}
                index={index}
                removeMenuItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      <Button
        type="button"
        className="mt-2"
        onClick={() => append({ name: "", price: 0 })}
      >
        {" "}
        Add Menu Item
      </Button>
    </div>
  );
};
