import DeatilSectionContainer from './DeatilSectionContainer'
// import React, { useEffect, useState } from 'react'
// import { isImgValid } from '../../utils/isImgValid'
// import imgNotFound from '../../assets/image/image-not-found.jpg'
// import PremiumIcon from '../../components/icons/PremiumIcon'
import ReviewIcon from '../../components/icons/ReviewIcon'
import DetailCard from './DetailCard'

const DetailComments = () => {
	return (
		<DeatilSectionContainer>
			<DetailCard>
				<div className='flex items-center mb-8'>
					<ReviewIcon className='w-8 h-8 mr-8' />
					<h2 className='text-3xl md:text-4xl'>Reviews</h2>
				</div>
			</DetailCard>
		</DeatilSectionContainer>
	)
}

export default DetailComments
