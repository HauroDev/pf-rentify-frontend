import { useSelector } from "react-redux";
import { getUserProducts } from "../../services/profile";
import { useEffect, useState } from "react";
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

  const product = stateProduct.product.map((prod) => prod);
  const productArray = Object.values(product);
  if (product.length == 0)
    return (
      <div className="mt-4 flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Crear Publicación
        </button>
      </div>
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div className="flex flex-wrap">
        {productArray.map((producto) => (
          <div
            key={producto.idProd}
            className={`w-[370px] md:w-[480px] lg:w-[527px] h-full min-h-40 md:min-h-[225px] p-8 bg-gray_light dark:bg-card_dark rounded-lg shadow-md ${
              productArray.length === 1 ? "mx-auto" : ""
            }`}
          >
            <img
              className="w-full max-h-80  object-contain"
              src={producto.image}
              alt="Imagen del producto"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{producto.name}</div>
              <p className="text-gray-700 text-base">{producto.item}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardProfile;
