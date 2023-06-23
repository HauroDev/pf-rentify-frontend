import { useDispatch } from 'react-redux'
import { resetCart } from '../../app/features/cart/cartSlice'
import { deleteAllItemsFromCart } from '../../services/cartService'
import { useNavigate } from 'react-router-dom'
import TrophyIcon from '../../components/icons/TrophyIcon'
import { routesName } from '../../utils/routes_name'
import ClockPausedIcon from '../../components/icons/ClockPausedIcon'
import BanICon from '../../components/icons/BanICon'

const CheckoutResponse = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const queryParams = new URLSearchParams(window.location.search)
	const paymentId = queryParams.get('payment_id')
	const status = queryParams.get('status')
	const merchantOrderId = queryParams.get('merchant_order_id')
	// const preferenceId = queryParams.get('preference_id')

	const infoToShow = {
		approved: {
			icon: (
				<TrophyIcon className='stroke-dark_purple dark:stroke-light_purple w-36 h-36 animate-bounce' />
			),
			message: 'Your purchase was successful!!!🥳',
			paymentMsg: `Payment ID: ${paymentId}`,
			orderMsg: `Order ID: ${merchantOrderId}`,
		},
		pending: {
			icon: (
				<ClockPausedIcon className='stroke-dark_purple dark:stroke-light_purple w-36 h-36 animate-bounce' />
			),
			message: 'Your payment is pending...',
			paymentMsg: `Payment ID: ${paymentId}`,
			orderMsg: `Order ID: ${merchantOrderId}`,
		},
		rejected: {
			icon: (
				<BanICon className='stroke-dark_purple dark:stroke-light_purple w-36 h-36 animate-bounce' />
			),
			message: 'Your payment has been declined.',
			paymentMsg: `Payment ID: ${paymentId}`,
			orderMsg: `Order ID: ${merchantOrderId}`,
		},
		null: {
			icon: (
				<BanICon className='stroke-dark_purple dark:stroke-light_purple w-36 h-36 animate-bounce' />
			),
			message: 'Your payment has been declined.',
			paymentMsg: `Payment ID: ${paymentId}`,
			orderMsg: `Order ID: ${merchantOrderId}`,
		},
	}

	if (status === 'approved' || status === 'pending') {
		deleteAllItemsFromCart()
		dispatch(resetCart())
	}

	const handleClick = () => {
		navigate(routesName.home, { replace: true })
	}

	return (
		<div className='w-full min-h-[80vh] flex flex-col justify-center items-center gap-16'>
			<div>{infoToShow[status].icon}</div>
			<h1 className='text-4xl md:text-6xl text-center'>{infoToShow[status].message}</h1>

			<div className='grid place-content-center gap-4'>
				<p className='text-2xl text-center'>{infoToShow[status].paymentMsg}</p>
				<p className='text-2xl text-center'>{infoToShow[status].orderMsg}</p>
			</div>

			<button
				className='bg-dark_purple hover:bg-medium_purple text-white px-6 py-2 rounded-md'
				onClick={handleClick}>
				Back to home
			</button>
		</div>
	)
}

export default CheckoutResponse
