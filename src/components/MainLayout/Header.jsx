import CartIcon from '../icons/CartIcon'
import SunIcon from '../icons/SunIcon'
import MoonIcon from '../icons/MoonIcon'
import UserICon from '../icons/UserIcon'

const Header = () => {
	return (
		<header>
			<div className=' flex justify-end items-center gap-6 w-full p-4'>
				<CartIcon className='stroke-dark_purple' />
				<div>
					<SunIcon className='stroke-dark_purple' />
					<MoonIcon className='stroke-dark_purple' />
				</div>
				<UserICon className='stroke-dark_purple' />
			</div>
		</header>
	)
}

export default Header
