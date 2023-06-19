const BtnAddCartCard = () => {
    return (
      <div className="flex flex-col items-center ">
        <button className="bg-medium_purple px-8 py-4 rounded-lg text-white text-base md:text-base mb-4 hover:bg-dark_purple transition-colors max-w-md w-full">
          Rent Now
        </button>
        <button className="bg-gray_light px-8 py-4 rounded-lg text-medium_purple text-base md:text-base hover:bg-gray_dark transition-colors max-w-md w-full">
          Add to Cart
        </button>
      </div>
    );
  };
  
  export default BtnAddCartCard;
  