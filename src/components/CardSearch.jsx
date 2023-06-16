/* eslint-disable react/prop-types */
import imageNotFound from '../assets/image/image-not-found.jpg'
import { isImgValid } from '../utils/isImgValid'
import { useEffect, useState } from 'react'
import { formatDate } from '../utils/formatDate'
import { useNavigate } from 'react-router-dom'

const CardSearch = ({ image, id, name, price, updatedAt, closeModal, isOnModal = true }) => {
	const [imgValid, setImgValid] = useState(false)
	const [date, setDate] = useState('')

	const navigate = useNavigate()

	useEffect(() => {
		isImgValid(image, setImgValid)
		setDate(formatDate(updatedAt))
	}, [image, updatedAt])

	const handleNavigate = () => {
		navigate(`/product/${id}`)
		if (isOnModal) {
			closeModal()
		}
	}

	return (
		<div
			className='w-full bg-white dark:bg-card_dark p-4 rounded-md shadow flex cursor-pointer max-h-[150px]'
			onClick={handleNavigate}>
			<section className='flex gap-2 items-center md:items-start w-10/12'>
				<div className='w-16 h-16 md:w-24 md:h-24 overflow-hidden rounded flex items-center'>
					<img
						src={imgValid ? image : imageNotFound}
						alt={name}
						className='w-full min-w-[64px] rounded'
					/>
				</div>
				<div className='truncate'>
					<h3 className='truncate text-lg md:text-2xl'>{name}</h3>
					<p className='font-amaranth text-base md:text-xl'>
						$ {price} <span className='text-xs md:text-base'>moneda</span>
					</p>
					<p className='text-gray_dark text-xs md:text-base md:mt-4'>{date}</p>
				</div>
			</section>
		</div>
	)
}

export default CardSearch
