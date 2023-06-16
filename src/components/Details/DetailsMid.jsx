import DeatilSectionContainer from './DeatilSectionContainer'

/* eslint-disable react/prop-types */
const DetailsMid = ({ description }) => {
	return (
		<DeatilSectionContainer>
			<div className='h-full min-h-40  md:min-h-[225px]  p-8 bg-white dark:bg-card_dark rounded-lg shadow-md'>
				<h2 className='text-3xl md:text-4xl mb-8'>Description</h2>
				<p className='md:text-lg'>{description}</p>
			</div>

			<div className=' min-h-40  md:min-h-[225px] p-8 bg-white dark:bg-card_dark rounded-lg shadow-md'>
				<h4 className='text-base md:text-lg text-gray_dark'>Vendedor</h4>
			</div>
		</DeatilSectionContainer>
	)
}

export default DetailsMid
