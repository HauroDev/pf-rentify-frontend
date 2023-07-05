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

  // const [stateProduct, setStateProduct] = useState(initalStateProduct);

  // const state = useSelector((state) => state.user);
  // const user = state.user;
  // const id = user.idUser;

  // const getProductId = async (id, set) => {
  //   set({
  //     status: "loading",
  //     product: [],
  //     error: null,
  //   });
  //   try {
  //     const data = await getUserProducts(id);
  //     console.log(data);
  //     set({
  //       status: "success",
  //       product: [...data],
  //       error: null,
  //     });
  //   } catch (error) {
  //     set({
  //       status: "error",
  //       product: [],
  //       error: error.response.data.message,
  //     });
  //   }
  // };

  useEffect(() => {
    if (productsState.status === "success") console.log(productsState.product);
  }, [productsState.status]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {productsState?.status === "success" ? (
        (productsState?.product).map((product) => (
          <Card key={product.idProd} product={product} />
        ))
      ) : (
        <Link
          to={routesName.user["create-product"]}
          className="bg-medium_purple hover:bg-dark_purple text-white px-4 py-2 rounded-lg"
        >
          Crear Publicación
        </Link>
      )}
    </div>
  );
};

export default CardProfile;
