import DeatilSectionContainer from './DeatilSectionContainer';
import React, { useEffect, useState } from 'react';
import { isImgValid } from '../../utils/isImgValid';
import imgNotFound from '../../assets/image/image-not-found.jpg';
import PremiumIcon from '../../components/icons/PremiumIcon';
import ReviewIcon from '../../components/icons/ReviewIcon';

const DetailComments = ({ image, membershipType }) => {
  const [imgExist, setImgExist] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    isImgValid(image, setImgExist);
    setIsPremium(membershipType === "premium");
  }, [image, membershipType]);

  return (
    <DeatilSectionContainer>
      <div className='w-full h-full min-h-40 md:min-h-[225px] p-8 bg-gray_light dark:bg-card_dark rounded-lg shadow-md'>
        <h2 className='text-3xl md:text-4xl mb-8'>
          <ReviewIcon className='w-8 h-8' />
          Reviews
        </h2>
      </div>
      <div className='h-full min-h-40 md:min-h-[225px] p-8 bg-gray_light dark:bg-card_dark rounded-lg shadow-md'>
        <h4 className='text-base md:text-lg text-gray_dark mb-2'>User</h4>
        <div className='flex items-center'>
          <img
            src={imgExist ? image : imgNotFound}
            alt='User'
            className='w-20 h-20 rounded-full'
          />
          <div className='ml-4 flex flex-col'>
            <h5 className='text-lg font-medium mb-2'>
              <span className='flex items-center'>
                Name {isPremium && <PremiumIcon className='ml-2 w-4 h-4' />}
              </span>
            </h5>
            <button className='bg-medium_purple hover:bg-dark_purple text-white px-4 py-2 rounded-lg'>
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </DeatilSectionContainer>
  );
}

export default DetailComments;