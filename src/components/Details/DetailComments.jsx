import DeatilSectionContainer from './DeatilSectionContainer';
import React, { useEffect, useState } from 'react';
import { isImgValid } from '../../utils/isImgValid';
import imgNotFound from '../../assets/image/image-not-found.jpg';
import PremiumIcon from '../../components/icons/PremiumIcon';
import ReviewIcon from '../../components/icons/ReviewIcon';

const DetailComments = ({ user }) => {
  const [imgExist, setImgExist] = useState(false);

  useEffect(() => {
    isImgValid(user.image, setImgExist);
  }, [user.image]);

  return (
    <DeatilSectionContainer>
      <div className='w-full h-full min-h-40 md:min-h-[225px] p-8 bg-gray_light dark:bg-card_dark rounded-lg shadow-md'>
        <div className='flex items-center mb-8'>
          <ReviewIcon className='w-8 h-8 mr-8' />
          <h2 className='text-3xl md:text-4xl'>Reviews</h2>
        </div>
      </div>
      <div className='h-full min-h-40 md:min-h-[225px] p-8 bg-gray_light dark:bg-card_dark rounded-lg shadow-md'>
        <h4 className='text-base md:text-lg text-gray_dark mb-2'>User</h4>
        <div>
          <div className='flex items-center mb-4'> {/* Agregado: Agregamos la clase "mb-4" para el margen inferior */}
            <img
              src={imgExist ? user.image : imgNotFound}
              alt={user.name}
              className='w-24 h-24 rounded-md'
              style={{ border: '1px solid #999999' }}
            />
            <div className='ml-4 flex flex-col'>
              <h5 className='text-lg font-medium mb-2'>
                <span className='flex items-center'>
                  {user.name.toUpperCase()}
                  {user.membership === 'premium' && (
                    <PremiumIcon className='ml-2 w-4 h-4' />
                  )}
                </span>
              </h5>
              <button className='bg-medium_purple hover:bg-dark_purple text-white px-4 py-2 rounded-lg'>
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </DeatilSectionContainer>
  );
};

export default DetailComments;
