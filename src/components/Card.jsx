import React from 'react';
import db from './db.json';
import StarIcon from './icons/StarIcon';
import CartIcon from './icons/CartIcon';


const Card = () => {
  // Obtener la categoría correspondiente al producto
  const products = db.products; 
  const category = db.categories.find(
    (category) => category.id === products.categoryId
  );
 // Los estilos me ayudo mi asistente :) por ahora
  return (
	 <div>
	    {products.map((product) => (
	     <div className="card border border-gray-200 shadow-md rounded-lg p-4">
		     {product.isFeatured && (
		         <div className="flex items-center justify-between mb-2">
			           <div className="text-green-500 font-bold">Promocionado</div>
			          <StarIcon/>
		          </div>
		        )}
		<img src={product.image} alt="Imagen del producto" className="w-full mb-2 rounded-lg" />
		<div className="text-xl font-bold mb-2">${product.price}</div>
		<div className="text-lg mb-2">{product.name}</div>
		<div className="text-gray-600 mb-2">
		  {<p>{category ? category.name : 'no category'}</p>}
		</div>
		<CartIcon/>
	  </div>
	 ))}
  </div>
);
};

export default Card;


