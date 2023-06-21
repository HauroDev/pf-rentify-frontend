import { Link } from 'react-router-dom'
import UserIcon from '../icons/UserIcon'
import { useEffect, useState } from 'react'
import { isImgValid } from '../../utils/isImgValid'
import imgNotFound from '../../assets/image/image-not-found.jpg'
import { useSelector } from 'react-redux'
import BtnLogout from './BtnLogout'

const UserMenu = () => {
	const [imgExist, setImgExist] = useState(false)
	const [isMenuOpen, setMenuOpen] = useState(false)

	const userState = useSelector((state) => state.user)

	useEffect(() => {
		if (userState.login === true) {
			isImgValid(userState.user?.image, setImgExist)
		}
	}, [userState.login])

	const handleMenuClick = () => {
		setMenuOpen(!isMenuOpen)
	}

	const loggedInMenu = (user) => (
		<div className='absolute top-14 right-0 bg-white dark:bg-card_dark shadow-md w-52 mt-2 rounded-md'>
			<div className='flex items-center pt-2 pb-1 gap-2 px-4 py-1 truncate'>
				<img
					src={imgExist ? user.image : imgNotFound}
					alt='User'
					className='w-8 h-8 rounded-full'
				/>

				<span className='text-sm truncate'>{user?.name || user?.email || ''}</span>
			</div>
			<div className='my-2 border-b'></div>
			<section className='w-full flex flex-col'>
				<span className='text-left cursor-pointer w-full px-4 py-2 hover:bg-dark_purple hover:text-white'>
					Profile
				</span>
				<span className='text-left cursor-pointer w-full px-4 py-2 hover:bg-dark_purple hover:text-white'>
					My Products
				</span>
				<span className='text-left cursor-pointer w-full px-4 py-2 hover:bg-dark_purple hover:text-white'>
					Create a Service
				</span>
			</section>
			<div className='my-2 border-b'></div>

			<BtnLogout closeModal={setMenuOpen} />
		</div>
	)

	const loggedOutMenu = (
		<div className='absolute top-14 right-0 bg-white dark:bg-card_dark shadow-md w-52 rounded-md '>
			<div className='flex items-center px-4 pt-2 pb-1 gap-2'>
				<span className='text-sm'>You have not logged in</span>
			</div>
			<div className='my-2 border-b'></div>
			<Link to='/login'>
				<button className='block text-left w-full px-4 py-2 hover:bg-dark_purple hover:text-white'>
					Login
				</button>
			</Link>
			<Link to='/signup'>
				<button className='block text-left w-full px-4 py-2 hover:bg-dark_purple hover:text-white'>
					Register
				</button>
			</Link>
		</div>
	)

	return (
		<div className='relative'>
			<UserIcon
				className='stroke-dark_purple dark:stroke-light_purple cursor-pointer'
				onClick={handleMenuClick}
			/>
			{isMenuOpen ? (userState.login ? loggedInMenu(userState.user) : loggedOutMenu) : ''}
		</div>
	)
}

export default UserMenu
