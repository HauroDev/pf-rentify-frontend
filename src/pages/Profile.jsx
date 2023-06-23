import UserProfile from "../components/Profile/Profile";
import { getUser } from "../services/userService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const initalState = {
  user: {},
  status: "idle",
  error: null,
};

const Profile = () => {
  const [state, setState] = useState(initalState);
  const { id } = useParams();

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
      ;
    </>
  );
};

export default Profile;
