import DeatilSectionContainer from './DeatilSectionContainer'
 import React, { useEffect, useState } from 'react'
// import { isImgValid } from '../../utils/isImgValid'
// import imgNotFound from '../../assets/image/image-not-found.jpg'
// import PremiumIcon from '../../components/icons/PremiumIcon'
import ReviewIcon from '../../components/icons/ReviewIcon'
import DetailCard from './DetailCard'

const DetailComments = () => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <DeatilSectionContainer>
      <DetailCard>
        <div className='flex items-center mb-8'>
          <ReviewIcon className='w-8 h-8 mr-8' />
          <h2 className='text-3xl md:text-4xl'>Reviews</h2>
        </div>

        <StarRating rating={rating} onRatingChange={handleRatingChange} />
      </DetailCard>
    </DeatilSectionContainer>
  );
};

const StarRating = ({ rating, onRatingChange }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          filled={value <= rating}
          onClick={() => onRatingChange(value)}
        />
      ))}
      <p>Rating: {rating}</p>
    </div>
  );
};

const Star = ({ filled, onClick }) => {
  const starStyle = {
    cursor: 'pointer',
    color: filled ? 'gold' : 'gray',
  };

  return (
    <span className='star' style={starStyle} onClick={onClick}>
      ★
    </span>
  );
};

export default DetailComments;