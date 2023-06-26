import UserProfile from "../components/Profile/Profile";
import { useSelector } from "react-redux";

import Loader from "../components/Loader";

const Profile = () => {
  const state = useSelector((state) => state.user);
  const user = state.user;


  if (state.status === "loading") return <Loader />;

  if (state.status === "error") return <h3>Error: {state.error}</h3>;

  return (
    <>
      <UserProfile
        image={user.image}
        name={user.name}
        phone={user.phone}
        membership={user.membership}
      />
    </>
  );
};

export default Profile;
