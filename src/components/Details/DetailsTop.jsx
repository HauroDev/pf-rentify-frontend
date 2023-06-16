/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import imgNotFound from '../../assets/image/image-not-found.jpg'
import { formatDate } from '../../utils/formatDate'
import { isImgValid } from '../../utils/isImgValid'
import DeatilSectionContainer from './DeatilSectionContainer'

const DetailsTop = ({ image, updatedAt, name, idProd, price, location }) => {
	const [imgExist, setImgExist] = useState(false)
	const [date, setDate] = useState('')

	useEffect(() => {
		isImgValid(image, setImgExist)
		setDate(formatDate(updatedAt))
	}, [updatedAt, image])

	return (
		<DeatilSectionContainer>
			<div className='w-80 h-80 md:w-[450px] md:h-[450px] md:min-w-[450px]  overflow-hidden bg-white dark:bg-card_dark p-4 rounded-lg grid place-content-center'>
				<img
					src={imgExist ? image : imgNotFound}
					alt={name}
					className='object-cover w-full h-fit rounded-lg'
				/>
			</div>

			<div className='w-full py-8 flex flex-col justify-between gap-4 xl:h-[450px]'>
				<h2 className='text-3xl md:text-4xl'>{name}</h2>
				<h4 className='text-2xl md:text-3xl text-gray_dark'>Product id: {idProd}</h4>
				<h4 className='text-2xl md:text-3xl'>
					$ {price} <span className='text-base'>Moneda local</span>
				</h4>

				<h4>{location}</h4>

				<h4>{date}</h4>
			</div>
		</DeatilSectionContainer>
	)
}

export default DetailsTop
