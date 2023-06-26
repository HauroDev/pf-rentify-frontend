import { useSelector } from "react-redux";
import { getUserProducts } from "../../services/profile";
import { useEffect, useState } from "react";
import Card from "../Home/Card"

const initalStateProduct = {
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
  const productArray = Object.values(products);
  if (products.length == 0)
    return (
      <div className="mt-4 flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Crear Publicación
        </button>
      </div>
    );
  return (
<>
{products.map((product)=> (<Card key={product.idProd} product={product}/>))}
</>
  );
};

export default CardProfile;
