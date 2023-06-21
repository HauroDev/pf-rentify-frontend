import { useState } from 'react';
import CartIcon from '../icons/CartIcon';
import CartIconEmpty from '../icons/CartIconEmpty';

const RentalCartMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const cartItems = []; // info productos carrito
  const handleEmptyCart = () => {
    // Lógica para vaciar el carrito
  };

  const cartMenuContent = (
    <div className="absolute top-14 right-0 bg-white dark:bg-card_dark shadow-md w-96 rounded-md p-4" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-semibold">Rental Cart</span>
        <button className="text-sm text-text_light dark:text-white" onClick={handleEmptyCart}>
          Empty Cart
        </button>
      </div>
      <div className="my-2 border-b"></div>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full mt-8">
          <div className="flex items-center mb-4">
            <CartIconEmpty className="text-6xl dark:stroke-light_purple" />
            <p className="text-text_light text-center ml-2 text-3xl dark:text-white">Your cart is empty!</p>
          </div>
          <p className="text-text_light text-center dark:text-white">Fill it with all the products you want to rent, then take it to checkout.</p>
        </div>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="px-4 py-2 mb-2">
            {/* Renderizar la información de cada producto en el carrito */}
            <span>{item.name}</span>
            <span>{item.price}</span>
          </div>
        ))
      )}
      
      <button className="block text-center w-full mt-8 px-4 py-2 bg-medium_purple text-white rounded hover:bg-dark_purple">
        Continue to checkout
      </button>
    </div>
  );

  const handleOutsideClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className="relative">
      <CartIcon
        className="stroke-dark_purple dark:stroke-light_purple cursor-pointer"
        onClick={handleMenuClick}
      />
      {isMenuOpen && (
        <div onClick={handleOutsideClick}>
          {cartMenuContent}
        </div>
      )}
    </div>
  );
};

export default RentalCartMenu;
