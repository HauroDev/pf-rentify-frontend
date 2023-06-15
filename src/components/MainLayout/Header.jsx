import CartIcon from '../icons/CartIcon'
import UserICon from '../icons/UserIcon'
import BtnDarkMode from './BtnDarkMode'

const Header = () => {
	return (
		<header className='h-[60px] fixed top-0 right-0 w-full p-4 bg-body_light dark:bg-body_dark'>
			<div className='flex justify-end items-center gap-6 w-full'>
				<CartIcon className='stroke-dark_purple dark:stroke-light_purple cursor-pointer' />
				<BtnDarkMode />
				<UserICon className='stroke-dark_purple dark:stroke-light_purple cursor-pointer' />
			</div>
		</header>
	)
}

export default Header
