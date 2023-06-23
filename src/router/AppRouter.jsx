import { Routes, Route } from "react-router-dom";
import { routesName } from "../utils/routes_name";
import MainLayout from "../components/MainLayout/MainLayout";
import Home from "../pages/Home";
import DetailProduct from "../pages/DetailProduct";
import SearchProducts from "../pages/SearchProducts";
import CreateProduct from "../pages/CreateProduct";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path={routesName.home} element={<Home />} />
        <Route path={routesName.detail_product} element={<DetailProduct />} />
        <Route path={routesName.search_products} element={<SearchProducts />} />
        <Route
          path={routesName.user["create-product"]}
          element={<CreateProduct />}
        />
        <Route path={routesName.signup} element={<SignUp />} />
        <Route path={routesName.login} element={<Login />} />
        <Route path={routesName.user["profile"]} element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
