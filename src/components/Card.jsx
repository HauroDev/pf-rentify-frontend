import React, { useEffect, useState } from 'react';
import { dataExample } from '../utils/db';
import FeaturedIcon from './icons/FeaturedIcon';
import BtnAddCartCard from './BtnAddCartCard';

const Card = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setProducts(dataExample.products);
    setCategories(dataExample.categories);
  }, []);

//   const getCategoryName = (categoryId) => {
//     const category = categories.find((c) => c.Id === categoryId);
//     return category ? category.nameCategoria : 'No Category';
//   };
// {Array.isArray(product.categoryId)
// 	? product.categoryId.slice(0, 2).map((categoryId) => (
// 		<p key={categoryId}>{getCategoryName(categoryId)}</p>
// 	  ))
// 	: <p>{getCategoryName(product.categoryId)}</p>
//   }

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className='card border border-gray-200 shadow-md rounded-lg p-4'>
          {product.isFeatured && (
            <div className='flex items-center bg-dark_purple'>
              <div className='flex items-center pr-2 mb-2'>
                <FeaturedIcon className='w-10 h-10' />
                <div className='text-text_dark font-bold font-amaranth text-2xl'>Sponsored</div>
              </div>
            </div>
          )}
          <img src={product.image} alt='Image of the product' className='w-full mb-2 rounded-lg' />
          <div className='text-3xl font-cabin font-bold mb-2'>${product.price}</div>
          <div className='text-3xl font-amaranth font-bold mb-2'>{product.name}</div>
		  <div className='mb-2 flex text-medium_fuchsia '>
				{/* Mostrar las dos primeras categorías del producto si existen */}
				{product.categoryId &&
					(Array.isArray(product.categoryId) ? product.categoryId : [product.categoryId])
						.map((categoryId) => {
							const category = categories.find((c) => c.id === categoryId);
							if (category) {
								return <p key={category.id} className="px-4 py-2 mr-2 bg-purple_badge rounded-lg" >{category.name}</p>;
							}
					 return null;
				    })}
		  </div>
          <BtnAddCartCard />
        </div>
      ))}
    </div>
  );
};

export default Card;
