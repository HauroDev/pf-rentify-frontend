import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CartIcon from '../icons/CartIcon';
import DeleteIcon from '../icons/DeleteIcon';
import { addToCart, deleteAllItemsFromCart, subFromCart } from '../../services/cartService';
import { setCart, resetCart } from '../../app/features/cart/cartSlice';
import {useSelector, useDispatch} from 'react-redux';
import DeleteCartIcon from '../icons/DeleteCartIcon';

const RentalCartMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const cartState = useSelector ((state)=>state.cart)
  const dispatch = useDispatch()

  const handleMenuClick = (event) => {
    event.stopPropagation();
    console.log('Menu clicked');
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  console.log('isMenuOpen:', isMenuOpen);

  const handleEmptyCart = () => {
    deleteAllItemsFromCart()
	dispatch(resetCart())
  };

  const handleIncreaseQuantity = (product) => {
	const cart = addToCart(product)
	dispatch(setCart(cart))

   
  };

  const handleDecreaseQuantity = (product) => {
   const cart = subFromCart(product)
   dispatch(setCart(cart))
  };

   const handleOutsideClick = () => {
    setMenuOpen(false);
  };

  const menuRef = useRef(null);

  useEffect(() => { console.log(cartState.cart)
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        handleOutsideClick();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const cartMenuContent = (
    <div
      ref={menuRef}
      className="absolute z-10 top-14 right-0 bg-white dark:bg-card_dark shadow-md w-96 md:w-[500px] rounded-md p-4 overflow-y-auto h-80 scrollbar-thin scrollbar-thumb-dark_purple scrollbar-thumb-rounded-md scrollbar-track-light_purple"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-semibold">Rental Cart</span>
        <button onClick={handleEmptyCart}>
          <DeleteIcon className="stroke-dark_purple dark:stroke-light_purple cursor-pointer" />
        </button>
      </div>
      <div className="my-2 border-b"></div>
      {cartState.cart.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex items-center mb-4">
            <DeleteCartIcon className="dark:stroke-light_purple" />
            <p className="text-text_light text-center ml-2 text-3xl dark:text-white">
              Your cart is empty!
            </p>
          </div>
          <p className="text-text_light text-center dark:text-white">
            Fill it with all the products you want to rent, then take it to
            checkout.
          </p>
        </div>
      ) : (
        <>
          {cartState.cart.items.map((item) => (
            <div key={item.idProd} className="px-4 py-2 mb-2">
              <div className="w-full bg-white dark:bg-card_dark p-4 rounded-md shadow cursor-pointer max-h-[130px]">
              <section className="flex gap-2 items-center md:items-start w-full truncate">
                <div className="w-24 h-24 md:w-24 md:h-24 overflow-hidden rounded flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full min-w-[64px] rounded"
                  />
                </div>
                <div className="truncate">
                  <h3 className="truncate text-lg md:text-2xl">{item.name}</h3>
                  <p className="font-amaranth text-base md:text-xl">
                    $ {item.price} <span className="text-xs md:text-base">{cartState.cart.currency}</span>
                  </p>
                  <section className="text-gray_dark text-xs md:text-base md:mt-0">
                    <div className="flex items-center">
                      <button
                        className="px-2 py-1 text-sm text-white bg-medium_purple rounded-full"
                        onClick={() => handleDecreaseQuantity(item)}
                      >
                        -
                      </button>
                      <span className="px-2 py-1 text-lg font-semibold">
                        {item.quantity} 
                      </span>
                      <button
                        className="px-2 py-1 text-sm text-white bg-medium_purple rounded-full"
                        onClick={() => handleIncreaseQuantity(item)}
                      >
                        +
                      </button>
                      <span className="text-base ml-1">days</span>
                    </div>
                  </section>
                </div>
              </section>
            </div>
            </div>
          ))}
        </>
      )}

        <div className="flex items-center justify-between mb-4 mt-6">
            <span className="text-xl font-semibold">Subtotal</span>
            <span className="text-xl font-semibold">${cartState.cart.total} <span className="text-xs md:text-base ml-1">{cartState.cart.currency}</span></span> 
        </div>	
        
    <Link to="/checkout" className="block text-center text-xl w-full px-4 py-2 bg-medium_purple text-white rounded hover:bg-dark_purple" 
    onClick={handleMenuClose}>
      Continue to checkout
    </Link>
    </div>
  );

  return (
    <div className="flex items-center justify-center">
      <button className="relative z-20" onClick={handleMenuClick}>
        {cartState.cart.items.length > 0 ? (
          <div className="relative ">
            <CartIcon className="stroke-dark_purple dark:stroke-light_purple" />
            <span className="absolute -top-1 -right-1 bg-red-500 rounded-full text-white text-xs px-1">
              {cartState.cart.items.length}
            </span>
          </div>
        ) : (
          <CartIcon className="stroke-dark_purple dark:stroke-light_purple" />
        )}
      </button>
      {isMenuOpen && cartMenuContent}
    </div>
  );
};

export default RentalCartMenu;



