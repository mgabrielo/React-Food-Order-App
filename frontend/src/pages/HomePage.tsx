import landingImg from "../assets/img/mobilephones.jpeg";
import downloadAppImg from "../assets/img/app-store-badges.png";
import { SearchBar, SearchForm } from "@/components/lib/SearchBar";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchValue: SearchForm) => {
    navigate({
      pathname: `/search/${searchValue.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg px-5 md:px-10 shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-500">
          Order your favorite food today
        </h1>
        <span className="text-xl">Your Takeaway is just a click away !!!</span>
        <div className="w-full flex px-0 md:px-30">
          <SearchBar
            placeHolder="Search By City"
            onSubmit={handleSearchSubmit}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImg} />
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <span className="font-bold text-3xl tracking-tight">
            Place Your Order Online
          </span>
          <span>Download the GreatEats App from your Store App</span>
          <img src={downloadAppImg} />
        </div>
      </div>
    </div>
  );
};
