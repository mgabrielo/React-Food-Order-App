import { FC } from "react";
import { Link } from "react-router-dom";
type Props = {
  total: number;
  city: string;
};

export const SearchResultInfo: FC<Props> = ({ total, city }) => {
  return (
    <div className="p-1 gap-1">
      <div className="flex flex-col md:flex-row lg:flex-row items-baseline">
        <span>
          {total} Restaurant(s) found in {city} city.
        </span>
        <Link
          to={"/"}
          className="font-semibold underline text-sm md:pl-2 text-blue-500 cursor-pointer"
        >
          Change Location
        </Link>
      </div>
    </div>
  );
};
