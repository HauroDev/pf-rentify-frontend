import PremiumIcon from "../icons/PremiumIcon";
import CardProfile from "./CardProfile";


const UserProfile = ({ image, name, phone, membership }) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-between">
      <div className="w-full lg:w-1/3 bg-white dark:bg-card_dark border border-gray-300 rounded-lg m-4 lg:m-0 flex flex-col items-center">
        <div className="flex justify-center items-center mt-12">
          <img
            src={image}
            alt={name}
            className="w-48 h-48 rounded-full aspect-w-1 aspect-h-1"
          />
        </div>
        <div className="text-center">
          <h1 className="text-xl p-4 font-bold">{name}</h1>
          <h3 className="text-xl p-1 font-bold">Phone: {phone}</h3>
        </div>
        <div className="justify-center">
          <h2 className="text-xl p-2 font-bold flex items-center">
            Membership: {membership && membership.toUpperCase()}{" "}
            {membership === "premium" && <PremiumIcon className="w-4 h-4" />}
          </h2>
        </div>

        <div className="text-center py-6">
          <button className="bg-medium_purple hover:bg-dark_purple text-white px-4 py-2 rounded-lg">
            Edit Profile
          </button>
        </div>
      </div>
      <div className="flex-grow bg-white border dark:bg-card_dark border-gray-300 rounded-lg m-4 flex flex-col justify-center items-center">
        <h2 className="text-xl p-12 font-bold text-center">
          <CardProfile />
        </h2>
      </div>
    </div>
  );
};
export default UserProfile;
