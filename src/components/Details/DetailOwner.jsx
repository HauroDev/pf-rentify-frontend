/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { isImgValid } from '../../utils/isImgValid'
import imgNotFound from '../../assets/image/image-not-found.jpg'
import PremiumIcon from '../../components/icons/PremiumIcon'
import DeatilSectionContainer from './DeatilSectionContainer'
import DetailCard from './DetailCard'

const DetailOwner = ({ user }) => {
	const [imgExist, setImgExist] = useState(false)

	useEffect(() => {
		isImgValid(user.image, setImgExist)
	}, [user.image])

	return (
		<DeatilSectionContainer>
			<DetailCard>
				<h4 className='text-base md:text-lg text-gray_dark mb-2'>Owner</h4>

				<div className='flex items-center mb-4'>
					{' '}
					{/* Agregado: Agregamos la clase "mb-4" para el margen inferior */}
					<img
						src={imgExist ? user.image : imgNotFound}
						alt={user.name}
						className='w-24 h-24 rounded-md'
						style={{ border: '1px solid #999999' }}
					/>
					<div className='ml-4 flex flex-col'>
						<h5 className='text-lg font-medium mb-2'>
							<span className='flex items-center'>
								{user.name.toUpperCase()}
								{user.membership === 'premium' && <PremiumIcon className='ml-2 w-4 h-4' />}
							</span>
						</h5>
						<button className='bg-medium_purple hover:bg-dark_purple text-white px-4 py-2 rounded-lg'>
							Contact Me
						</button>
					</div>
				</div>
			</DetailCard>
		</DeatilSectionContainer>
	)
}

export default DetailOwner
