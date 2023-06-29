import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReviewIcon from '../../components/icons/ReviewIcon';
import DetailCard from './DetailCard';
import DeatilSectionContainer from './DeatilSectionContainer';
import { AllComment, CreateComment } from '../../app/features/comment/commentSlice';

const DetailComments = ({ idProd, commentes }) => {
  const [rating, setRating] = useState(0);
  const userState = useSelector((state) => state.user);
  const commentState = useSelector((state) => state.comment);
  const [showRating, setShowRating] = useState(false);
  const [comment, setComment] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState({}); // Nuevo estado

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };
  
  const handleToggleRating = () => {
    if (userState.status === 'success') {
      setShowRating(!showRating);
    }
  };

  const handleSubmit = () => {
    if (userState.status === 'success') {
      const newComment = {
        comment: comment,
        puntuation: rating,
        idProd: idProd,
        idUser: userState.user.idUser
      };
      dispatch(CreateComment(newComment));
      setCommentSubmitted(newComment)
    }
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

  useEffect(() => {
    if (commentState.status === 'success') {
      window.location.reload();
    }
  }, [commentState.status]);

  return (
    <DeatilSectionContainer>
      <DetailCard>
        <div className='flex items-center mb-8'>
          <ReviewIcon className='w-8 h-8 mr-8' />
          <h2 className='text-3xl md:text-4xl'>Reviews</h2>
        </div>
        <div className="border border-gray-300 p-4">
          <h1 className="text-2xl font-bold mb-4">ALL COMMENTS</h1>

          {commentes.map((comment) => (
            <div key={comment.idComment} className='border border-gray-800 p-4 mb-4'>
              <p className="text-gray-800">Comment: {comment.comment}</p>
              <p className="text-gray-600">Puntuación: {comment.puntuation}</p>
              <p className="text-gray-600">Usuario: {comment.user.name}</p>
            </div>
          ))}
        </div>
        {userState.status === 'success' ? (
          <button className='bg-medium_purple hover:bg-dark_purple text-white px-4 py-2 rounded-lg' onClick={handleToggleRating}> Dejar Review</button>
        ) : (
          <button disabled>Review</button>
        )}

        {showRating && (
          <div>
            <StarRating rating={rating} onRatingChange={handleRatingChange} />
            <textarea
              value={comment}
              onChange={handleChange}
              placeholder='Write a review...'
              rows={4}
              cols={50}
            />
            <button className='bg-medium_purple hover:bg-dark_purple text-white px-4 py-2 rounded-lg' onClick={handleSubmit}>Submit</button>
          </div>
        )}
      </DetailCard>
    </DeatilSectionContainer>
  );
}
export default DetailComments;