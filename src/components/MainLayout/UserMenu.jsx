import { Link } from 'react-router-dom'
import UserIcon from '../icons/UserIcon'
import { useEffect, useRef, useState } from 'react'
import { isImgValid } from '../../utils/isImgValid'
import imgNotFound from '../../assets/image/image-not-found.jpg'
import { useSelector } from 'react-redux'
import BtnLogout from './BtnLogout'
import { routesName } from '../../utils/routes_name'
import LoggedInMenu from './UserMenuInfu'

const UserMenu = () => {
	const [imgExist, setImgExist] = useState(false)
	const [isMenuOpen, setMenuOpen] = useState(false)

	const userState = useSelector((state) => state.user)
	const refMenu = useRef(null)

	useEffect(() => {
		const handleClick = (event) => {
			if (refMenu.current && !refMenu.current?.contains(event.target)) {
				setMenuOpen(false)
			}
		}

		document.addEventListener('click', handleClick)

		return () => {
			document.removeEventListener('click', handleClick)
		}
	}, [])

	useEffect(() => {
		if (userState.login === true) {
			isImgValid(userState.user?.image, setImgExist)
		}
	}, [userState.login])

	const handleMenuClick = (event) => {
		event.stopPropagation()
		setMenuOpen((prev) => !prev)
	}
	// console.log('user menu open', isMenuOpen)



	const loggedOutMenu = (
		<div
			ref={refMenu}
			className='absolute top-14 right-0 bg-white dark:bg-card_dark shadow-md w-52 rounded-md '
			onClick={(e) => e.stopPropagation()}>
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
		<div className='relative icon-user'>
			<button className='flex items-center' onClick={handleMenuClick}>
				{!userState.user.hasOwnProperty('uid') ? (
					<UserIcon className='stroke-dark_purple dark:stroke-light_purple cursor-pointer' />
				) : (
					<img
						src={imgExist ? userState.user.image : imgNotFound}
						alt={userState.user.name}
						className='w-7 h-7 border-2 border-dark_purple rounded-full selection:bg-transparent'
					/>
				)}
			</button>
			{isMenuOpen && (userState.login ? <LoggedInMenu login={userState.login}
			refMenu={refMenu} setMenuOpen={setMenuOpen} user={userState.user}/> : loggedOutMenu)}
		</div>
	)
}

export default UserMenu
