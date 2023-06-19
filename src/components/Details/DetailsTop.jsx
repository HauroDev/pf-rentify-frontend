/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import imgNotFound from '../../assets/image/image-not-found.jpg';
import { formatDate } from '../../utils/formatDate';
import { isImgValid } from '../../utils/isImgValid';
import DeatilSectionContainer from './DeatilSectionContainer';
import MapPinIcon from '../icons/MapPinIcon';
import BtnAddCart from '../BtnAddCart';

//Quiero que la foto se vea mas grande pero no super como hacerlo osea que ocupe todo el contenedor

const DetailsTop = ({ image, updatedAt, name, idProd, price, location }) => {
  const [imgExist, setImgExist] = useState(false);
  const [date, setDate] = useState('');

  useEffect(() => {
    isImgValid(image, setImgExist);
    setDate(formatDate(updatedAt));
  }, [updatedAt, image]);

  return (
    <DeatilSectionContainer>
      <div className='w-80 h-80 md:w-[450px] md:h-[450px] md:min-w-[450px]  overflow-hidden bg-gray_light dark:bg-card_dark p-4 rounded-lg grid place-content-center'>
        <img
          src={imgExist ? image : imgNotFound}
          alt={name}
          className='object-cover w-full h-fit rounded-lg'
        />
      </div>

      <div className="flex flex-col mt-4">
        <div className="flex items-center">
          <h4 className="text-base text-gray_dark mb-2">Product id: {idProd}</h4>
          <span className="text-base text-gray_dark mx-1">|</span>
          <h4 className="text-base  text-gray_dark  mb-2">{date}</h4>
        </div>
        <h2 className="text-3xl md:text-4xl mb-2">{name}</h2>
        <h4 className="text-3xl text-dark_purple md:text-4xl mb-2">
          $ {price} <span className="text-base">Moneda local</span>
        </h4>
        <div className="flex items-center mb-8">
          <MapPinIcon className='stroke-card_dark w-4 h-4 md:w-6 md:h-6' />
          <h4 className="text-base md:text-xl ml-2">City: {location}</h4>
        </div>
        <div className='flex justify-center'>
          <BtnAddCart />
        </div>
      </div>
    </DeatilSectionContainer>
  );
};

export default DetailsTop;
