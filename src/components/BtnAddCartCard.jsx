import CartIcon from './icons/CartIcon'

const BtnAddCartCard = () => {
	return (
		<button className='bg-medium_purple px-2 py-1 rounded hover:bg-dark_purple transition-colors'>
			<CartIcon className='stroke-white w-4 h-4 md:w-6 md:h-6' />
		</button>
	)
}

export default BtnAddCartCard
