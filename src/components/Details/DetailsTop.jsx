/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import imgNotFound from '../../assets/image/image-not-found.jpg'

import { isImgValid } from '../../utils/isImgValid'
import DeatilSectionContainer from './DeatilSectionContainer'

const DetailsTop = ({ image }) => {
	const [imgExist, setImgExist] = useState(false)

	useEffect(() => {
		isImgValid(image, setImgExist)
	}, [image])

	return (
		<>
			<DeatilSectionContainer>
				<div className='mx-auto w-80 h-80 md:w-[450px] md:h-[450px] md:min-w-[450px]  overflow-hidden bg-gray_light dark:bg-card_dark p-4 rounded-lg'>
					<img
						src={imgExist ? image : imgNotFound}
						alt={name}
						className='object-contain w-full rounded-lg h-[288px] md:h-[418px]'
					/>
				</div>
			</DeatilSectionContainer>
		</>
	)
}

export default DetailsTop
