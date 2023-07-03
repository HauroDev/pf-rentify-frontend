/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import { isImgValid } from '../../utils/isImgValid'
import imgNotFound from '../../assets/image/image-not-found.jpg'
import PremiumIcon from '../../components/icons/PremiumIcon'
import DeatilSectionContainer from './DeatilSectionContainer'
import DetailCard from './DetailCard'
import { useSelector } from 'react-redux'
import { contactOwnerService } from '../../services/contactService'
import { ToastContext } from '../../context/ToastContext'

const DetailOwner = ({ user: owner, product }) => {
	const [imgExist, setImgExist] = useState(false)
	const userState = useSelector((state) => state.user)
	const [status, setStatus] = useState('idle')
	const [error, setError] = useState(null)
	const { addToast } = useContext(ToastContext)

	useEffect(() => {
		isImgValid(owner.image, setImgExist)
	}, [owner.image])

	useEffect(() => {
		if (status === 'success') {
			addToast({
				title: 'Success',
				description: 'Message sended',
				type: 'success',
			})
		}
		if (status === 'error') {
			addToast({ title: 'Error', description: 'Error while send message', type: 'danger' })
		}
	}, [status])

	const handleContact = async () => {
		setStatus('loading')

		try {
			const wasSended = await contactOwnerService({
				userEmail: userState.user.email,
				userName: userState.user.name,
				ownerEmail: owner.email,
				product: product,
			})
			setStatus('success')
		} catch (error) {
			console.log(error)
			setStatus('error')
			setError(error)
		}
	}

	return (
		<DeatilSectionContainer>
			<DetailCard>
				<h4 className='text-base md:text-lg text-gray_dark mb-2'>Owner</h4>

				<div className='flex items-center mb-4'>
					{' '}
					{/* Agregado: Agregamos la clase "mb-4" para el margen inferior */}
					<img
						src={imgExist ? owner.image : imgNotFound}
						alt={owner.name}
						className='w-24 h-24 rounded-md'
						style={{ border: '1px solid #999999' }}
					/>
					<div className='ml-4 flex flex-col'>
						<h5 className='text-lg font-medium mb-2'>
							<span className='flex items-center'>
								{owner.name.toUpperCase()}
								{owner.membership === 'premium' && <PremiumIcon className='ml-2 w-4 h-4' />}
							</span>
						</h5>
						{userState.login && (
							<button
								className='bg-medium_purple hover:bg-dark_purple text-white px-4 py-2 rounded-lg'
								onClick={handleContact}>
								{status === 'loading' ? 'Loading...' : 'Contact Me'}
							</button>
						)}
					</div>
				</div>
			</DetailCard>
		</DeatilSectionContainer>
	)
}

export default DetailOwner
