import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";

import DetailsTop from "../components/Details/DetailsTop";
import DetailsMid from "../components/Details/DetailsMid";
import DetailComments from "../components/Details/DetailComments";
import Loader from "../components/Loader";

const initalState = {
  product: {},
  status: "idle",
  error: null,
};

const DetailProduct = () => {
  const [state, setState] = useState(initalState);
  const { id } = useParams();

  const getProduct = async (id, set) => {
    set({
      status: "loading",
      product: {},
      error: null,
    });
    try {
      const data = await getProductById(id);
      console.log(data);
      set({
        status: "success",
        product: { ...data },
        error: null,
      });
    } catch (error) {
      set({
        status: "error",
        product: {},
        error: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    getProduct(id, setState);
    return () => {
      setState(initalState);
    };
  }, [id]);

  if (state.status === "loading") return <Loader />;

  if (state.status === "error") return <h3>Error: {state.error}</h3>;

  return (
    <>
      {state.status === "success" && (
        <div className="w-full xl:w-10/12  mx-auto flex flex-col gap-8">
          {state.product.idProd && (
            <>
              <DetailsTop
                idProd={state.product.idProd}
                image={state.product.image}
                location={state.product.location}
                name={state.product.name}
                price={state.product.price}
                updatedAt={state.product.updatedAt}
              />

              <DetailsMid description={state.product.description} />

              <DetailComments user={state.product.users[0]} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default DetailProduct;
