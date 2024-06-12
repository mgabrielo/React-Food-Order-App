import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/layout";
import { HomePage } from "./pages/HomePage";
import { AuthCallbackPage } from "./pages/AuthCallbackPage";
import { UserProfilePage } from "./pages/UserProfilePage";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { ManageRestaurantPage } from "./pages/ManageRestaurantPage";
import { SearchPage } from "./pages/SearchPage";
import { DetailPage } from "./pages/DetailPage";
import { OrderDetailsPage } from "./pages/OrderDetailsPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route path={"/auth-callback"} element={<AuthCallbackPage />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path={"/user-profile"}
          element={
            <Layout showHeroSection={false}>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path={"/manage-restaurant"}
          element={
            <Layout showHeroSection={false}>
              <ManageRestaurantPage />
            </Layout>
          }
        />
        <Route
          path={"/search/:city"}
          element={
            <Layout showHeroSection={false}>
              <SearchPage />
            </Layout>
          }
        />
        <Route
          path={"/detail/:restaurantId"}
          element={
            <Layout showHeroSection={false}>
              <DetailPage />
            </Layout>
          }
        />
        <Route
          path={"/order-details"}
          element={
            <Layout showHeroSection={false}>
              <OrderDetailsPage />
            </Layout>
          }
        />
      </Route>
      <Route path={"*"} element={<Navigate to={"/"} />} />
    </Routes>
  );
};
