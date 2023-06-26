import { useSelector } from "react-redux";
import { getUserProducts } from "../../services/profile";
import { useEffect, useState } from "react";
import Card from "./Card";
import { routesName } from "../../utils/routes_name";
import { Link } from "react-router-dom";
import { connectStorageEmulator } from "firebase/storage";

export const initalStateProduct = {
  product: [],
  status: "idle",
  error: null,
};
const CardProfile = () => {
  const [stateProduct, setStateProduct] = useState(initalStateProduct);

  const state = useSelector((state) => state.user);
  const user = state.user;
  const id = user.idUser;

  const getProductId = async (id, set) => {
    set({
      status: "loading",
      product: [],
      error: null,
    });
    try {
      const data = await getUserProducts(id);
      console.log(data);
      set({
        status: "success",
        product: [...data],
        error: null,
      });
    } catch (error) {
      set({
        status: "error",
        product: [],
        error: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    getProductId(id, setStateProduct);
    return () => {
      setStateProduct(initalStateProduct);
    };
  }, [id]);

  const products = stateProduct.product.map((prod) => prod);
  console.log(products);

  return (
    <div className="flex flex-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {products.length != 0 ? (
        products.map((product) => (
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
