const BtnAddCartCard = () => {
	return (
		<div className='flex justify-start items-center w-10/12 gap-4'>
			<button className='bg-medium_purple px-4 py-3 text-base lg:text-lg rounded-lg text-white md:text-base hover:bg-dark_purple transition-colors max-w-md w-full'>
				Rent Now
			</button>
			<button className='bg-gray_light px-4 py-3 text-base lg:text-lg rounded-lg text-medium_purple md:text-base hover:bg-gray_dark transition-colors max-w-md w-full'>
				Add to Cart
			</button>
		</div>
	)
}

export default BtnAddCartCard
