import UserProfile from "../components/Profile/Profile";
import { getUser } from "../services/userService";
import { getUserProducts } from "../services/profile";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const initalState = {
  user: {},
  status: "idle",
  error: null,
};

const initalStateProduct = {
  product: {},
  status: "idle",
  error: null,
};
const Profile = () => {
  const [state, setState] = useState(initalState);
  const [stateProduct, setStateProduct] = useState(initalStateProduct);
  const { id } = useParams();
  //USER///////////
  const getUserId = async (id, set) => {
    set({
      status: "loading",
      user: {},
      error: null,
    });
    try {
      const data = await getUser(id);
      console.log(data);
      set({
        status: "success",
        user: { ...data },
        error: null,
      });
    } catch (error) {
      set({
        status: "error",
        user: {},
        error: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    getUserId(id, setState);
    return () => {
      setState(initalState);
    };
  }, [id]);
  ////////////
  //PRODUCT///
  const getProductId = async (id, set) => {
    set({
      status: "loading",
      product: {},
      error: null,
    });
    try {
      const data = await getUserProducts(id);
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
    getProductId(id, stateProduct);
    return () => {
      setStateProduct(initalStateProduct);
    };
  }, [id]);
  ////////

  if (state.status === "loading") return <Loader />;

  if (state.status === "error") return <h3>Error: {state.error}</h3>;

  console.log(state.user);

  return (
    <>
      <UserProfile
        image={state.user.image}
        name={state.user.name}
        phone={state.user.phone}
        membership={state.user.membership}
      />
    </>
  );
};

export default Profile;
