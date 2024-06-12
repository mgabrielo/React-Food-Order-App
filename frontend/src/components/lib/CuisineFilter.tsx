import React from "react";
import { cuisineList } from "@/config/restaurant-options-config";
import { Label } from "../ui/label";
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};
export const CuisineFilter = ({
  onChange,
  selectedCuisines = [],
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleCuisineReset = () => {
    onChange([]);
  };

  const handleCuisineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = e.target.value;
    const isChecked = e.target.checked;
    const newCuisineList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisineList);
  };
  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Cuisine</div>
        <div
          onClick={handleCuisineReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div>

      <div className="space-y-2 flex flex-col">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine, index) => {
            const selectedCuisine = selectedCuisines.includes(cuisine);
            return (
              <div className="flex" key={index}>
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={selectedCuisine}
                  onChange={handleCuisineChange}
                />
                <Label
                  className={`flex w-full gap-2 rounded-full items-center cursor-pointer text-sm px-4 py-2 font-semibold
              ${
                selectedCuisine
                  ? "border border-green-500 text-green-600"
                  : "border border-slate-300"
              }
              `}
                  htmlFor={`cuisine_${cuisine}`}
                >
                  {selectedCuisine && (
                    <CheckCircle size={20} strokeWidth={2.5} />
                  )}
                  {cuisine}
                </Label>
              </div>
            );
          })}
        <Button
          variant={"outline"}
          className="mt-4 rounded-full self-center border border-gray-500"
          onClick={onExpandedClick}
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};
