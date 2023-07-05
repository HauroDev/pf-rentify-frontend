import DetailsTop from "../components/Details/DetailsTop";
import { useState, useEffect} from "react";
import MapPinIcon from "../components/icons/MapPinIcon";
import { useSelector } from "react-redux";
import imgNotFound from "../assets/image/image-not-found.jpg";
import PremiumIcon from "../components/icons/PremiumIcon";
import DescriptionIcon from "../components/icons/DescriptionIcon";

const ProductPreview = ({name,description,price,location,image,currency}) => {
  console.log({name,description,price,location,image});
  const [imagePreview, setImagePreview] = useState(null);
  const [today,setToday] = useState("");
  const {user} = useSelector(state => state.user)
  
  const handleImageUpload = () => {
    if(!image){
      setImagePreview(null);
      return null
    }
    const file = image[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const setDate = () =>{
    let todayDate = new Date()
    const months = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    const monthName = months[todayDate.getMonth()];
    const day = todayDate.getDate();
    const year = todayDate.getFullYear();
    setToday(`${monthName} ${day}, ${year}`);
  }
  useEffect(()=>{
    handleImageUpload()
    setDate()
  },[image])
    return(
        
          <div className='mx-auto w-auto flex flex-col gap-5 bg-gray_medium rounded-md p-8 dark:bg-card_dark'>
						<div className='flex justify-center flex-wrap gap-3 '>
							<div>
                <h2 className="text-2xl font-bold mb-3">Post Preview</h2>
								<DetailsTop image={imagePreview} />
								<section className='w-full grid justify-center content-center md:items-start gap-8 xl:gap-12 mb-8'>
                  <div className='w-[370px] md:w-[480px] lg:w-[527px] h-full min-h-40 md:min-h-[225px] p-8 bg-gray_light dark:bg-card_dark rounded-lg shadow-md'>
                    <div className='flex items-center'>
                      <DescriptionIcon className='mr-4' />
                      <h2 className='text-3xl md:text-2xl'>Description</h2>
                    </div>
                    <div className='mt-8'>
                      <p className='md:text-bse'>{description}</p>
                    </div>
                  </div>
                </section>

                <section className='w-full grid justify-center content-center md:items-start gap-8 xl:gap-12 mb-8'>
                  <div className='w-[370px] md:w-[480px] lg:w-[527px] h-full min-h-40 md:min-h-[225px] p-8 bg-gray_light dark:bg-card_dark rounded-lg shadow-md' >
                    <h4 className='text-base md:text-lg text-gray_dark mb-2'>Owner</h4>
                    <div className='flex items-center mb-4'>
                      {' '}
                      <img
                        src={user.image ? user.image : imgNotFound}
                        alt={user.name}
                        className='w-24 h-24 rounded-md'
                        style={{ border: '1px solid #999999'}}
                      />
                      <div className='ml-4 flex flex-col'>
                        <h5 className='text-lg font-medium mb-2'>
                          <span className='flex items-center'>
                            {user.name.toUpperCase()}
                            {user.membership === 'premium' && <PremiumIcon className='ml-2 w-4 h-4' />}
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </section>
							</div>

							<div className='xl:block top-12 h-full bg-white dark:bg-card_dark rounded-lg'>
                <div className='flex flex-col gap-4 mt-4 p-8 min-w-[400px]'>
                  <div className='flex items-center'>
                    <h4 className='text-base text-gray_dark mb-2'>Product id: ##</h4>
                    <span className='text-base text-gray_dark mx-1'>|</span>
                    <h4 className='text-base  text-gray_dark  mb-2'>{today}</h4>
                  </div>
                  <h2 className='text-2xl xl:text-3xl mb-2'>{name}</h2>
                  <h4 className='text-2xl text-dark_purple dark:text-light_purple md:text-4xl mb-2'>
                    {currency?.symbol} {isNaN(price)?``:`${price}`} <span className='text-base'>{currency?.code}</span>
                  </h4>
                  <div className='flex items-center mb-8'>
                    <MapPinIcon className='stroke-card_dark dark:stroke-white w-4 h-4 md:w-6 md:h-6' />
                    <h4 className='text-base md:text-xl ml-2'>City: {location}</h4>
                  </div>
                </div>
							</div>
						</div>
					
				</div>


    )
}

export default ProductPreview;