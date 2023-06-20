/* eslint-disable react/prop-types */
const DetailCard = ({ children }) => {
	return (
		<div className='w-[370px] md:w-[480px] lg:w-[527px] h-full min-h-40 md:min-h-[225px] p-8 bg-gray_light dark:bg-card_dark rounded-lg shadow-md'>
			{children}
		</div>
	)
}

export default DetailCard
