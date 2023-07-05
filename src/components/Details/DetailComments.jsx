import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DetailCard from './DetailCard';
import DeatilSectionContainer from './DeatilSectionContainer';
import { CreateComment, EditComment, DeletComment } from '../../app/features/comment/commentSlice';
import { ToastContext } from '../../context/ToastContext'
import DeleteIcon from '../icons/DeleteIcon';
import EditIcon from '../icons/EditIcon';

const DetailComments = ({ idProd, commentes, star, average,updated }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState({});
  const [editCommentId, setEditCommentId] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState('');

  const userState = useSelector((state) => state.user);
  const commentState = useSelector((state) => state.comment);
  const [showRating, setShowRating] = useState(false);
   const {addToast}=useContext(ToastContext);
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
  useEffect(() => {
    if (commentState.status === 'error') {
      return addToast({
        title:'Error',
        description:commentState.error,
        type:'danger'
      })
    }
  }, [commentState.status])




  const handleEditComment = (comment) => {
    setEditCommentId(comment.idComment);
    setEditRating(comment.puntuation);
    setEditComment(comment.comment);

  };

  const handleDeleteComment = (comment) => {
    if (userState.status === 'success') {
      const DelettComment = {
        idProd: idProd,
        idUser: userState.user.idUser,
        idComment: comment.idComment,
        commentStatus: false
      };
      addToast({
        title:'Warning',
        description:'Delete Comment',
        type:'warning'
      })
      dispatch(DeletComment(DelettComment));
      setCommentSubmitted(DelettComment);

    
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
      setCommentSubmitted(newComment);
    }
  };

  const handleEditSubmit = () => {
    if (userState.status === 'success' && editRating !== 0) {
      const editedComment = {
        comment: editComment,
        puntuation: editRating,
        idProd: idProd,
        idUser: userState.user.idUser,
        idComment: editCommentId
      };
      addToast({
        title:'Success',
        description:'Updated comment',
        type:'success'
      })
      dispatch(EditComment(editedComment));
      setCommentSubmitted(editedComment);
      setEditCommentId(null);

    
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
          // addToast({
          //   title:'success',
          //   description:' comment added',
          //   type:'success'
          // })
          setTimeout(() => {
            
            window.location.reload();
          }, 300);
    }
  }, [commentState.status]);

  return (
    <DeatilSectionContainer >
    <DetailCard >
    <div className='flex items-center mb-8 border-b-2 border-gray_medium pb-8'>
        <div className='flex flex-col'>
          <h2 className='text-3xl md:text-4xl text-text_light dark:text-text_dark'>Customer Review</h2>
          <div className='grid grid-cols-2 gap-4 py-4'>
            <div className='col-span-1 flex flex-col items-center justify-start'>
              {average !== null && (
                <>
                  <span className='text-yellow-400 text-5xl'>{getStars(average)}</span>
                  <span className='text-3xl md:text-4xl text-text_light dark:text-white'>
                    {average.toFixed(1)}
                  </span>
                </>
              )}
          </div>
          <div className='col-span-1 text-text_light dark:text-text_dark'>
            {[5, 4, 3, 2, 1].map((num) => {
              const progressWidth = (star['s' + num] / commentes.length) * 100;
              return (
                <div className='flex items-center mb-2' key={num}>
                  <span className='text-gray-700 text-md font-semibold dark:text-text_dark'>{num}</span>
                  <span className='text-yellow-400 mr-2 '>★</span>
                  <div className='flex items-center h-4 w-64 bg-gray-300 rounded-lg overflow-hidden'>
                    <div className='h-full bg-green_medium' style={{ width: `${progressWidth}%` }}></div>
                  </div>
                  <span className='ml-2 text-sm text-gray-600 dark:text-text_dark'>{star['s' + num]}</span>
                </div>
              );
            })}
         </div>
       </div>
    </div>
  </div>

    <div>
      <div className='mb-4 '>
        <h2 className='text-text_light dark:text-text_dark text-2xl md:text-3xl'>Review the Product</h2>
      </div>
      <div>
        <p className='text-text_light dark:text-text_dark'>Share your thoughts with other customers</p>
      </div>
      <div className='mt-4 '>
        {userState.status === 'success' ? (
          <button className='bg-medium_purple hover:bg-dark_purple text-white px-4 py-2 rounded-lg text-lg' onClick={handleToggleRating}>
            Write a customer review
          </button>
        ) : (
          <button disabled></button>
        )}
      </div>
    </div>

    {showRating && (
      <div className='mt-4'>
        <StarRating rating={rating} onRatingChange={handleRatingChange} />
        <textarea
          value={comment}
          onChange={handleChange}
          placeholder='Write a review...'
          rows={4}
          cols={50}
          className='w-full resize-none bg-white dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <div className='mt-4 py-2'>
          <button className='bg-medium_purple hover:bg-dark_purple text-white px-4 py-2 rounded-lg text-lg' onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    )}

    <div className='border-b-2 border-gray_medium mt-6 mb-8 '></div>
    <div >
          <h1 className='text-2xl md:text-3xl mt-4 mb-4 text-text_light dark:text-text_dark'>All reviews</h1>

          {commentes.map((comment) => (
            <div key={comment.idComment} className='border-b-[1px] border-b-gray_medium p-4 mb-4'>
              {editCommentId === comment.idComment ? (
                <div>
                  <StarRating rating={editRating} onRatingChange={setEditRating} />
                  <textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    placeholder='Write a review...'
                    rows={4}
                    cols={50}
                    className='w-full resize-none border bg-white dark:text-text_dark dark:bg-card_dark border-gray_dark rounded focus:outline-none focus:ring focus:border-medium_purple'
                  />
                  <div className='py-2'>
                    <button className='bg-medium_purple hover:bg-dark_purple text-white px-4 py-2 rounded-lg' onClick={handleEditSubmit}>
                      Submit
                    </button>
                  </div>
                </div>
               ) : (
                <div >
                  {comment.idUser === userState.user.idUser && (
                    <div className='flex justify-end'>
                      <button
                        type='submit'
                        onClick={() => handleEditComment(comment)}
                        disabled={comment.idUser !== userState.user.idUser}
                        className='mr-2'
                      >
                        <EditIcon className='h-5 w-5 dark:stroke-light_purple' />
                      </button>
                      <button
                        type='submit'
                        onClick={() => handleDeleteComment(comment)}
                        disabled={comment.idUser !== userState.user.idUser}
                      >
                        <DeleteIcon className='h-5 w-5 dark:stroke-light_purple' />
                      </button>
                    </div>
                  )}
                  <div className='flex items-center'>
                    <div className='flex items-end'>
                      {[...Array(comment.puntuation)].map((_, index) => (
                        <span key={index} className='text-yellow-400'>
                          ★
                        </span>
                      ))}
                      <span className='ml-2 text-gray_dark leading-6 text-sm'>{comment.user.name}</span>
                    </div>
                  </div>
                  <div className='col-span-2 mt-2'>
                    <div className='overflow-hidden leading-6 text-md'>
                      <p className='text-gray-800 dark:text-white' style={{ wordBreak: 'break-word' }}>
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                  <div className='col-span-1 flex items-start justify-end'>
                    <p className='text-gray_dark leading-6 text-xs'>
                      {`${new Date(comment.updatedAt).getDate().toString().padStart(2, '0')}/${(new Date(comment.updatedAt).getMonth() + 1).toString().padStart(2, '0')}/${new Date(comment.updatedAt).getFullYear()}`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </DetailCard>
    </DeatilSectionContainer>
  );
};

export default DetailComments;

function getStars(average) {
  const starCount = Math.floor(average);
  const halfStar = average % 1 !== 0;

  let stars = '★'.repeat(starCount);

  if (halfStar) {
    stars += '✬';
  }

  return stars;
}