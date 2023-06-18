import { useState } from 'react';
import UserIcon from '../icons/UserIcon';
import LogoutIcon from '../icons/LogoutIcon';

const UserMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false); // Estado de inicio de sesión

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
          src="https://assets.stickpng.com/images/585e4bcdcb11b227491c3396.png"
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
      <button className="block text-left w-full px-4 py-2 hover:bg-gray_medium">
        Login
      </button>
      
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
