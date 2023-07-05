/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react'
import BtnAddCart from '../BtnAddCart'
import MapPinIcon from '../icons/MapPinIcon'
import { formatDate } from '../../utils/formatDate'

const DetailInfo = ({ idProd, name, price, location, updatedAt, country, image, status }) => {
	const [date, setDate] = useState('')

	useEffect(() => {
	
		setDate(formatDate(updatedAt))
	}, [updatedAt])

	const statusClass =
		status === 'inactive'
			? 'bg-amber-200 text-amber-700'
			: status === 'deleted'
			? 'bg-red-300 text-red-600'
			: ''

	return (
		<div className='flex flex-col gap-4 mt-4 p-8 min-w-[400px] '>
			{status !== 'active' && (
				<p className={`${statusClass} max-w-[100px] text-center rounded-md`}>{status}</p>
			)}
			<div className='flex items-center'>
				<h4 className='text-base text-gray_dark mb-2'>Product id: {idProd}</h4>
				<span className='text-base text-gray_dark mx-1'>|</span>
				<h4 className='text-base  text-gray_dark  mb-2'>{date}</h4>
			</div>
			<h2 className='text-3xl xl:text-4xl mb-2'>{name}</h2>
			<h4 className='text-3xl text-dark_purple dark:text-light_purple md:text-4xl mb-2'>
				{country.currency.symbol} {price} <span className='text-base'>{country.currency.code}</span>
			</h4>
			<div className='flex items-center mb-8'>
				<MapPinIcon className='stroke-card_dark dark:stroke-white w-4 h-4 md:w-6 md:h-6' />
				<h4 className='text-base md:text-xl ml-2'>City: {location}</h4>
			</div>

			{status === 'active' && (
				<div>
					<BtnAddCart
						size='lg'
						product={{
							name: name,
							price: price,
							image: image,
							idProd: idProd,
							country: country,
						}}
					/>
				</div>
			)}
		</div>
	)
}

export default DetailInfo
