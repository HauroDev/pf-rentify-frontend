import CartIcon from '../icons/CartIcon'
import UserICon from '../icons/UserIcon'

const Header = () => {
	return (
		<header>
			<div className=' flex justify-end items-center gap-6 w-full p-4'>
				<CartIcon className='stroke-dark_purple' />
				<UserICon className='stroke-dark_purple' />
			</div>
		</header>
	)
}

export default Header
