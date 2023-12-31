/* eslint-disable react/prop-types */
import HamburgerIcon from '../icons/HamburgerIcon'
import UserMenu from './UserMenu'
import CartMenu from './CartMenu'
import BtnDarkMode from './BtnDarkMode'
import logoImg from '../../assets/image/logo-rentify.png'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { routesName } from '../../utils/routes_name'

const Header = ({ openModal }) => {
	const userState = useSelector((state) => state.user)
	return (
		<header className='h-[60px] flex items-center justify-between fixed z-10 top-0 right-0 w-full p-4 bg-body_light dark:bg-body_dark'>
			<Link to={routesName.home}>
				<div className='w-36 min-w-[130px] md:hidden'>
					<img src={logoImg} alt='rentify logo' className='min-w-[130px]' />
				</div>
			</Link>

			<div className='flex justify-end items-center gap-4 md:gap-6 w-full'>
				<CartMenu />
				<BtnDarkMode />
				<UserMenu />
				<button className='md:hidden block' onClick={openModal}>
					<HamburgerIcon className='stroke-dark_purple dark:stroke-light_purple cursor-pointer ' />
				</button>
			</div>
		</header>
	)
}

export default Header
