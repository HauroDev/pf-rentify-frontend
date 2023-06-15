import React, { useEffect, useState } from 'react';
import FeaturedIcon from './icons/FeaturedIcon';
import BtnAddCartCard from './BtnAddCartCard';
import axios from 'axios';

const Card = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api-rentify.onrender.com/api-rentify/products/');
      const { results } = response.data;
      setProducts(results);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryName = (categoryId) => {
    const product = products.find((p) => p.idProd === categoryId);
    if (product && product.categories.length > 0) {
      return product.categories[0].name;
    } else {
      return 'No Category';
    }
  };

  const formatCreatedAt = (createdAt) => {
	const date = new Date(createdAt);
	const day = date.getDate();
	const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
	const year = date.getFullYear();
	return `${day} ${month} ${year}`;
  };
  

  return (
    <div>
      {products.map((product) => (
        <div key={product.idProd} className='card border border-gray-200 shadow-md rounded-lg p-4'>
          {product.isFeatured && (
            <div className='flex items-center bg-dark_purple'>
              <div className='flex items-center pr-2 mb-2'>
                <FeaturedIcon className='w-10 h-10' />
                <div className='text-text_dark font-bold font-amaranth text-2xl'>Sponsored</div>
              </div>
            </div>
          )}
          <img src={product.image} alt='Image of the product' className='w-full mb-2 rounded-lg' />
          <div className='flex justify-between items-end text-3xl font-cabin font-bold mb-2'>
            ${product.price}
			<span className="text-sm text-gray_dark">
              {formatCreatedAt(product.createdAt)}
            </span>
          </div>
          <div className='text-3xl font-amaranth font-bold mb-2'>{product.name}</div>
          <div className='mb-2 flex text-medium_fuchsia'>
            <p className="px-4 py-2 mr-2 bg-purple_badge rounded-lg">{getCategoryName(product.idProd)}</p>
          </div>
		  <div className="flex justify-end w-full"><BtnAddCartCard /></div>
          
        </div>
      ))}
    </div>
  );
};

export default Card;



