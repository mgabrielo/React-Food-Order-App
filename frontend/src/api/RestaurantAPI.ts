import { Restaurant, RestaurantSearchResult } from "@/app-types/types";
import { SearchState } from "@/pages/SearchPage";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL!;
export const useSearchRestaurant = (
  city?: string,
  searchState: SearchState = {
    searchQuery: "",
    selectedCuisines: [],
    sortOption: "bestMatch",
  }
) => {
  const { getAccessTokenSilently } = useAuth0();

  const getSearchRestaurantRequest =
    async (): Promise<RestaurantSearchResult> => {
      const token = await getAccessTokenSilently();
      const searchParams = new URLSearchParams();
      searchParams.set("searchQuery", searchState?.searchQuery);
      if (searchState.page) {
        searchParams.set("page", searchState?.page?.toString());
      }
      searchParams.set(
        "selectedCuisines",
        searchState?.selectedCuisines.join(",")
      );
      searchParams.set("sortOption", searchState.sortOption);
      const res = await fetch(
        `${API_BASE_URL}/api/restaurant/search/${city}?${searchParams.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        console.error("Not Able to Get Restaurants");
      }
      return res.json();
    };

  const {
    data: results,
    isLoading,
    error,
  } = useQuery<RestaurantSearchResult, Error>(
    ["searchRestaurants", searchState],
    getSearchRestaurantRequest,
    {
      enabled: !!city,
      onError: (err) => {
        console.error(err);
      },
    }
  );

  if (error) {
    throw new Error("Not Able to Get Restaurants");
  }

  return { results, isLoading };
};

export const useGetRestaurantDetail = (restaurantId?: string) => {
  const { getAccessTokenSilently } = useAuth0();

  const getRestaurantDetailRequest = async (): Promise<Restaurant> => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return res.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurantDetail",
    getRestaurantDetailRequest,
    {
      enabled: !!restaurantId,
      onError: (err) => {
        console.error(err);
      },
    }
  );

  return { restaurant, isLoading };
};
