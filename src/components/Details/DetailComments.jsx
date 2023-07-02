import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReviewIcon from '../../components/icons/ReviewIcon';
import DetailCard from './DetailCard';
import DeatilSectionContainer from './DeatilSectionContainer';
import { CreateComment } from '../../app/features/comment/commentSlice';

const DetailComments = ({ idProd, commentes, star, average }) => {
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
    if (userState.status === 'success' && rating !== 0) {
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
        {/* <p>Rating: {rating}</p> */}
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
        <div className='items-center mb-8'>
          <div>
            <div className='flex flex-col'>
              <ReviewIcon className='w-8 h-8 mr-8' />
              <h2 className='text-3xl md:text-4xl'>
                Reviews
              </h2>
              <div className='grid grid-cols-2 gap-4 py-4'>
                <div className='col-span-1 flex flex-col items-center justify-stard'>
                  {average !== null && (
                    <>
                      <span className='text-yellow-400 text-5xl'>{getStars(average)}</span>
                      <span className='text-3xl md:text-4xl text-black dark:text-white'>
                        {average.toFixed(1)}
                      </span>
                    </>
                  )}
                </div>
                <div className='col-span-1'>
                  {[5, 4, 3, 2, 1].map((num) => (
                    <span className='star text-black flex items-center dark:text-white' key={num}>
                      <span className='text-black dark:text-white'>{num} </span>
                      <span className='text-yellow-400'>★</span>
                      <span className='flex-grow'>------------------------</span>
                      {star['s' + num]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='py-6'>
          {userState.status === 'success' ? (
            <button className='bg-medium_purple hover:bg-dark_purple text-white px-4 py-2 rounded-lg ' onClick={handleToggleRating}> Dejar Review</button>
          ) : (
            <button disabled>Review</button>
          )}
        </div>
        {showRating && (
          <div>
            <StarRating rating={rating} onRatingChange={handleRatingChange} />
            <textarea
              value={comment}
              onChange={handleChange}
              placeholder='Write a review...'
              rows={4}
              cols={50}
              className='w-full resize-none bg-white dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <div className='py-2'>
              <button className='bg-medium_purple hover:bg-dark_purple text-white px-4 py-2 rounded-lg' onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        )}

        <div className="border border-gray-300 p-4">
          <h1 className="text-2xl font-bold mb-4">ALL COMMENTS</h1>

          {commentes.map((comment) => (
            <div key={comment.idComment} className='border border-gray-800 p-4 mb-4'>
              <div className="col-span-1 flex items-end justify-end">
                <p className="text-gray-600 dark:text-white">
                  {Array.from({ length: comment.puntuation }, (_, index) => (
                    <span key={index} className="text-yellow-400">★</span>
                  ))}
                </p>
              </div>
              <div className="col-span-2">
                <div className="overflow-hidden">
                  <p className="text-gray-800 dark:text-white" style={{ wordBreak: 'break-word' }}>{comment.comment}</p>
                </div>
              </div>
              <div className="col-span-1 flex items-start justify-end">
                <p className="text-right text-gray-600 dark:text-white dark:text-opacity-50 text-opacity-50">{comment.user.name}</p>
              </div>
            </div>
          ))}
        </div>

      </DetailCard>
    </DeatilSectionContainer>
  );
}
export default DetailComments;

function getStars(average) {
  const starCount = Math.floor(average); // Redondea hacia abajo al número entero más cercano
  const halfStar = average % 1 !== 0; // Verifica si hay media estrella

  let stars = '★'.repeat(starCount); // Crea una cadena de caracteres con la cantidad de estrellas completas

  if (halfStar) {
    stars += '✬'; // Agrega media estrella a la cadena
  }

  return stars;
}