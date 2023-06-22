import { useState } from 'react';
import CartIcon from '../icons/CartIcon';
import DeleteIcon from '../icons/DeleteIcon';
import CartIconEmpty from '../icons/CartIconEmpty';

const RentalCartMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "New Balance 574 CORE",
      price: "10",
      image: "https://external-preview.redd.it/UJzNtI3fOjOHPYL3VWgW1dW5o9DXYZA3lXAzHiAdYCg.jpg?auto=webp&s=0b7422c0c451a1d5f2964407f025d6c8e0be9ff2",
      date: "21/06/2023",
      quantity: 1
    },
    {
      id: 2,
      name: "Nike Air Max 270",
      price: "15",
      image: "https://images.asos-media.com/products/nike-air-max-270-sneakers-in-black/202962702-1-black?$n_640w$&wid=513&fit=constrain",
      date: "25/06/2023",
      quantity: 1
    },
    {
      id: 3,
      name: "Adidas Stan Smith",
      price: "12",
      image: "https://static.runnea.com/images/201802/adidas-stan-smith-footlocker-sneaker-1200x572x80xX.jpg?1",
      date: "27/06/2023",
      quantity: 1
    },
    {
      id: 4,
      name: "Puma Suede Classic",
      price: "20",
      image: "https://falabella.scene7.com/is/image/FalabellaCO/gsc_117443502_1780155_2?wid=800&hei=800&qlt=70",
      date: "30/06/2023",
      quantity: 1
    },
    {
      id: 5,
      name: "Vans Old Skool",
      price: "18",
      image: "https://media.revistagq.com/photos/5ca5f631f552a15d2332e804/master/w_1600%2Cc_limit/comprar_vans_old_skool_zapatillas_de_moda_skate_5593.jpg",
      date: "02/07/2023",
      quantity: 1
    }
  ]);

  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleEmptyCart = () => {
    setCartItems([]);
  };

  const handleIncreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : null // Si la cantidad es 1, se establece null para eliminar el elemento
          : item
      ).filter(Boolean) // Elimina los elementos nulos del arreglo
    );
  };
  

  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const cartMenuContent = (
    <div className="absolute z-10 top-14 right-0 bg-white dark:bg-card_dark shadow-md w-96 md:w-[500px] rounded-md p-4 overflow-y-auto h-80" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-semibold">Rental Cart</span>
        <button className="text-sm text-text_light dark:text-white" onClick={handleEmptyCart}>
          <DeleteIcon className="delete-icon" />
        </button>
      </div>
      <div className="my-2 border-b"></div>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full mt-8">
          <div className="flex items-center mb-4">
            <CartIconEmpty className="dark:stroke-light_purple" />
            <p className="text-text_light text-center ml-2 text-3xl dark:text-white">Your cart is empty!</p>
          </div>
          <p className="text-text_light text-center dark:text-white">Fill it with all the products you want to rent, then take it to checkout.</p>
        </div>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="px-4 py-2 mb-2">
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
                    $ {item.price} <span className="text-xs md:text-base">moneda</span>
                  </p>
                  <p className="text-gray_dark text-xs md:text-base md:mt-0">
                  <div className="flex items-center">
                  <button
                    className="px-2 py-1 text-sm text-white bg-medium_purple rounded-full"
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="px-2 py-1 text-lg font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    className="px-2 py-1 text-sm text-white bg-medium_purple rounded-full"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    + 
                  </button> 
                </div>
                    
                    </p>
                </div>
              
              </section>
            </div>
          </div>
        ))
      )}

      <button className="block text-center text-xl w-full mt-8 px-4 py-2 bg-medium_purple text-white rounded hover:bg-dark_purple">
        Continue to checkout
      </button>
    </div>
  );

  const handleOutsideClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className="relative">
      <button className="relative z-20" onClick={handleMenuClick}>
        {cartItems.length > 0 ? (
          <div className="relative">
            <CartIcon className="cart-icon" />
            <span className="absolute -top-1 -right-2 bg-red-500 rounded-full text-white text-xs w-4 h-4 flex items-center justify-center">
              {cartItems.length}
            </span>
          </div>
        ) : (
          <CartIconEmpty className="cart-icon-empty" />
        )}
      </button>
      {isMenuOpen && cartMenuContent}
    </div>
  );
};

export default RentalCartMenu;
