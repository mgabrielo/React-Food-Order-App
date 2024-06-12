import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export const ImageSection = () => {
  const { control, watch } = useFormContext();
  const existingImageUrl = watch("imageUrl");

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Image Upload</h2>
        <FormDescription>
          Include menu images for your restaurant. Adding images replaces older
          images
        </FormDescription>
      </div>
      <div className="flex flex-col gap-8  w-full md:w-[50%]">
        {existingImageUrl && (
          <AspectRatio ratio={16 / 9}>
            <img
              src={existingImageUrl}
              className="rounded-md object-cover size-full"
            />
          </AspectRatio>
        )}
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="file"
                  className="bg-white"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) =>
                    field.onChange(
                      e?.target?.files !== null ? e?.target?.files[0] : null
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
