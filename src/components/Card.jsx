import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FeaturedIcon from './icons/FeaturedIcon';
import BtnAddCartCard from './BtnAddCartCard';
import { PRODUCTS_API, CATEGORIES_API } from '../utils/apiRoutes';
import axios from 'axios';

const Card = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(PRODUCTS_API);
      const { results } = response.data;
      setProducts(results);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryNames = (categoryId) => {
    const product = products.find((p) => p.idProd === categoryId);
    if (product && product.categories.length > 0) {
      const categoryNames = product.categories.map((category) => {
        if (category.name === 'sports and fitness / health and wellness') {
          return 'sports and fitness';
        } else {
          return category.name;
        }
      });
      return categoryNames;
    } else {
      return ['No Category'];
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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.idProd} className='card border border-gray-200 shadow-md rounded-lg h-100 overflow-hidden bg-white dark:bg-card_dark p-4'>
          <Link to={`/product/${product.idProd}`} key={product.idProd}>
            {product.isFeatured && (
              <div className='flex items-center bg-dark_purple'>
                <div className='flex items-center pr-2'>
                  <FeaturedIcon className='w-7 h-7' />
                  <div className='text-text_dark font-bold font-amaranth text-sm'>Sponsored</div>
                </div>
              </div>
            )}
            <div className='h-48'>
              <img
                src={product.image}
                alt={product.name}
                className='object-cover w-full h-full'
              />
            </div>
            <div className='flex justify-between items-end text-2xl font-cabin font-bold mb-2'>
              ${product.price}
              <span className="text-sm text-gray_dark mb-2">
                {formatCreatedAt(product.createdAt)}
              </span>
            </div>
            <div className='text-2xl font-amaranth font-bold mb-2'>
              <p className="truncate max-w-full">{product.name}</p>
            </div>
            <div className='mb-2 flex flex-col text-medium_fuchsia'>
              {getCategoryNames(product.idProd).map((category, index) => (
                <p key={index} className="text-sm px-4 py-2 mr-2 mb-1 bg-purple_badge rounded-lg ">{category}</p>
              ))}
            </div>
            <div className="flex justify-end">
              <BtnAddCartCard />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Card;
