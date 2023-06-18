import { Link } from 'react-router-dom';
import UserIcon from '../icons/UserIcon';
import LogoutIcon from '../icons/LogoutIcon';
import React, { useEffect, useState } from 'react';
import { isImgValid } from '../../utils/isImgValid';
import imgNotFound from '../../assets/image/image-not-found.jpg';

const UserMenu = (image) => {
  const [imgExist, setImgExist] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(true); // Estado de inicio de sesión

  useEffect(() => {
    isImgValid(image, setImgExist);
    
  }, [image]);

  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Realizar las acciones necesarias para cerrar sesión

    setLoggedIn(false);
    setMenuOpen(false);
  };

  // Menú para usuario conectado
  const loggedInMenu = (
    <div className="absolute top-12 right-0 bg-white shadow-lg w-52">
      <div className="flex items-center gap-2 px-4 py-1 ">
        <img
          src={imgExist ? image : imgNotFound}
          alt="User"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm">Username</span>
      </div>

      <div className="my-2 border-b"></div>

      <button className="block text-left w-full px-4 py-2 hover:bg-gray_medium">
        Profile
      </button>
      <button className="block text-left w-full px-4 py-2 hover:bg-gray_medium">
        My Products
      </button>
      <button className="block text-left w-full px-4 py-2 hover:bg-gray_medium">
        Create a Service
      </button>

      <div className="my-2 border-b"></div>

      <button
        className="flex items-center w-full px-4 py-2 hover:bg-gray_medium"
        onClick={handleLogout}
      >
        <LogoutIcon
          className="stroke-dark_purple dark:stroke-light_purple cursor-pointer"
          width={24}
          height={24}
        />
        <span className="ml-2">Logout</span>
      </button>
    </div>
  );

  // Menú para usuario desconectado
  const loggedOutMenu = (
    <div className="absolute top-12 right-0 bg-white shadow-lg w-52">
        <div className="flex items-center px-4 gap-2">
         <span className="text-sm">You have not logged in</span>
       </div>

      <div className="my-2 border-b"></div>
      <Link to="/login">
          <button className="block text-left w-full px-4 py-2 hover:bg-gray_medium">
                Login
            </button>
        </Link>
        <Link to="/signup">
            <button className="block text-left w-full px-4 py-2 hover:bg-gray_medium">
                Register
            </button>
      </Link>
    </div>
  );

  return (
    <div className="relative">
      <UserIcon
        className="stroke-dark_purple dark:stroke-light_purple cursor-pointer"
        onClick={handleMenuClick}
      />

      {isMenuOpen && (isLoggedIn ? loggedInMenu : loggedOutMenu)}
    </div>
  );
};

export default UserMenu;
