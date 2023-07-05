/* eslint-disable react/prop-types */
// import PremiumIcon from '../icons/PremiumIcon'
import { useDispatch, useSelector } from "react-redux";
import { updateUserName, updateUserPhone } from "../../services/profile";
import CardProfile from "./CardProfile";
import { useState } from "react";
import { setUserName, setUserPhone } from "../../app/features/user/userSlice";

const UserProfile = ({ idUser, image, phone, email, membership }) => {
  const dispatch = useDispatch();
  let name;
  const localStorageData = localStorage.getItem("userAuth");

  if (localStorageData) {
    const user = JSON.parse(localStorageData).user;

    // Obtener el nombre del usuario

    // Imprimir el nombre del usuario en la consola

    name = user.name;
  }
  const [newName, setNewName] = useState(name);
  const [newPhone, setNewPhone] = useState(phone);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  // Obtener el contenido del localStorage

  // Verificar si existe el contenido y parsearlo a un objeto

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handlePhoneDoubleClick = () => {
    setIsEditingPhone(true);
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        await updateUserName(idUser, newName);
        setIsEditing(false);
        dispatch(setUserName(newName));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlePhoneKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        await setProductPrice(idUser, newPhone);
        setIsEditingPhone(false);
        dispatch(setUserPhone(newPhone));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-between">
      <div className="w-full lg:w-1/3 bg-white dark:bg-card_dark border border-gray_dark rounded-lg m-4 lg:m-0 flex flex-col items-center">
        <div className="flex justify-center items-center mt-12">
          <img
            src={image}
            alt={name}
            className="w-48 h-48 rounded-full aspect-w-1 aspect-h-1 "
          />
        </div>
        <div className="text-center">
          <h2
            className="text-xl p-4 font-bold"
            onDoubleClick={handleDoubleClick}
          >
            {isEditing ? (
              <input
                type="text"
                value={newName}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className=" bg-white dark:bg-card_dark"
              />
            ) : (
              newName
            )}
          </h2>
          <h3
            className="text-xl p-1 font-bold"
            onDoubleClick={handlePhoneDoubleClick}
          >
            {isEditingPhone ? (
              <input
                type="text"
                value={newPhone}
                onChange={handlePhoneChange}
                onKeyDown={handlePhoneKeyDown}
                className="text-zinc-950"
              />
            ) : (
              newPhone
            )}
          </h3>
          <h3 className="text-xl p-1 font-bold">{email}</h3>
        </div>
        <div className="justify-center">
          <h2 className="text-xl p-2 font-bold flex items-center">
            Membership: {membership && membership.toUpperCase()}{" "}
            {membership === "premium" && <span>💎</span>}
          </h2>
        </div>

        <div className="text-center py-6">
          {/**
           * 
           *           <button className="bg-medium_purple hover:bg-dark_purple text-white px-4 py-2 rounded-lg">
            Edit Profile
          </button>
           */}
        </div>
      </div>
      <div className="flex-grow bg-white border dark:bg-body_dark border-gray_dark rounded-lg m-4 flex flex-col justify-center items-center">
        <div className="px-12">
          <CardProfile />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
