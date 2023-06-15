import React, { useEffect, useState } from 'react'
import { dataExample } from '../utils/db'
import FeaturedIcon from './icons/FeaturedIcon'
import BtnAddCartCard from './BtnAddCartCard'

const Card = () => {
	// Obtener la categoría correspondiente al producto
	const [products, setProducts] = useState([])
	const [categories, setCategories] = useState([])

	useEffect(() => {
		setProducts(dataExample.products)
		setCategories(dataExample.categories)
	}, [])

	// Los estilos me ayudo mi asistente :) por ahora
	return (
		<div>
			{products.map((product) => (
				<div key={product.id} className='card border border-gray-200 shadow-md rounded-lg p-4'>
					{product.isFeatured && (
						<div className='flex items-center '>
							<div  className='bg-dark_purple flex items-center pr-2 mb-2'>
							<FeaturedIcon className='w-10 h-10 ' />
							<div className=' text-text_dark font-bold font-amaranth text-2xl'>Sponsored</div>
							</div>
						</div>
					)}
					<img src={product.image} alt='Image of the product' className='w-full mb-2 rounded-lg' />
					<div className='text-3xl font-cabin font-bold mb-2'>${product.price}</div>
					<div className='text-3xl font-amaranth font-bold mb-2'>{product.name}</div>
					<div className='text-gray-600 mb-2'>
						{<p>{categories ? categories.name : 'no category'}</p>}
					</div>
					<BtnAddCartCard/>
				</div>
			))}
		</div>
	)
}

export default Card
