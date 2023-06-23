const UserProfile = ({ image, name, phone, membership }) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-between">
      <div className="w-full lg:w-1/3 bg-white dark:bg-card_dark border border-gray-300 rounded-lg m-4 lg:m-0">
        <div className="flex justify-center items-center">
          <img src={image} alt={name} className="rounded-full h-800 w-800 " />
        </div>
        <div>
          <h1 className="text-xl text-center p-4 font-bold">{name}</h1>
        </div>
        <div>
          <h3 className="text-xl text-center p-1 font-bold">Phone : {phone}</h3>
        </div>
        <div>
          <h2 className="text-xl text-center p-2 font-bold">
            Membership : {membership}
          </h2>
        </div>

        <div className="text-center py-6">
          <button className="bg-blue-500 text-white rounded-md px-6 py-1 hover:shadow-inner transition duration-500 ease-in-out transform hover:-translate-x hover:scale-110">
            Edit Profile
          </button>
        </div>
      </div>
      <div className="flex-grow  bg-white border  dark:bg-card_dark border-gray-300 rounded-lg m-4">
        <h2 className="text-xl text-center p-12 font-bold">
          Mis últimos datos
        </h2>
        <h1>Listar mis datos</h1>
      </div>
    </div>
  );
};

export default UserProfile;
