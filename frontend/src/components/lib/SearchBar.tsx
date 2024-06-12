import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Search, XCircle } from "lucide-react";
import { Input } from "../ui/input";

const formSchema = z.object({
  searchQuery: z
    .string()
    .min(1, { message: "Restaurant Name Is Required" })
    .trim(),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
};

export const SearchBar: FC<Props> = ({
  onSubmit,
  placeHolder,
  onReset,
  searchQuery,
}) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: searchQuery || "",
    },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex w-full flex-row items-center gap-3 border justify-between rounded-full mx-0 p-1
        ${form.formState.isDirty ? "border-orange-500" : "border-gray-200"} `}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-2 mr-0 text-orange-500 hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...field}
                  className="md:px-0 lg:px-0 border-none shadow-none text-xl focus-visible:ring-0"
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <button type="button" onClick={handleReset} className="rounded-full">
          <XCircle
            strokeWidth={2.5}
            size={20}
            className="ml-0 md:ml-1 text-black flex md:hidden"
          />
          <p className="hidden md:flex font-semibold text-black text-md">
            Reset
          </p>
        </button>
        <button className="flex rounded-full p-3 bg-orange-500" type="submit">
          <p className="hidden md:flex font-semibold text-white">Search</p>
          <Search
            strokeWidth={2.5}
            size={15}
            className="ml-0 md:ml-1 text-white flex md:hidden"
          />
        </button>
      </form>
    </Form>
  );
};
