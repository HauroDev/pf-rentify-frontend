import { useSelector, useDispatch } from "react-redux";
import { getUserProducts } from "../../services/profile";
import { useEffect, useState } from "react";
import Card from "./Card";
import { routesName } from "../../utils/routes_name";
import { Link } from "react-router-dom";
import { connectStorageEmulator } from "firebase/storage";
import { fetchUserProducts } from "../../app/features/product/product";

// export const initalStateProduct = {
//   product: [],
//   status: "idle",
//   error: null,
// };
const CardProfile = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.idUser);
  const productsState = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchUserProducts(userId));
  }, [dispatch, userId]);



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {productsState?.status === "success" ? (
        (productsState?.product).map((product) => (
          <Card key={product.idProd} product={product} />
        ))
      ) : (
        <p>You have no products</p>
      )}
    </div>
  );
};

export default CardProfile;
