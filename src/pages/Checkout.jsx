import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initMercadoPago } from '@mercadopago/sdk-react'
import { MERCADOPAGO_PUBLIC_KEY } from '../mercadopacgo.config'
import { Wallet } from '@mercadopago/sdk-react'
import { Navigate } from 'react-router-dom'
import { routesName } from '../utils/routes_name'
import { postOrdenPago } from '../services/MercadoService'
import Loader from '../components/Loader'
import { addToCart, deleteAllItemsFromCart, subFromCart } from '../services/cartService'
import { setCart, resetCart } from '../app/features/cart/cartSlice'
import DeleteIcon from '../components/icons/DeleteIcon'

initMercadoPago(MERCADOPAGO_PUBLIC_KEY)

const Checkout = () => {
	const cartState = useSelector((state) => state.cart)
	const [isReadyStandard, setIsReadyStandard] = useState(false);
	const [isReadyPremium, setIsReadyPremium] = useState(false)
	const [preferenceId, setPreferenceId] = useState(null)
	const [loading, setIsLoading] = useState(false)
	const [isHovered, setIsHovered] = useState(false)
	const dispatch = useDispatch()

	const handleOnReadyStandard = () => {
		setIsReadyStandard(true)
	}

	const handleOnReadyPremium = () => {
		setIsReady(true)
	}

	const renderCheckoutButtonStandard = (preferenceId) => {
		if (!preferenceId) return null

		return (
			<Wallet
				initialization={{ preferenceId: preferenceId, redirectMode: 'self' }}
				onReady={handleOnReadyStandard}
			/>
		)
	}

	const renderCheckoutButtonPremium = (preferenceId) => {
		if (!preferenceId) return null

		return (
			<Wallet
				initialization={{ preferenceId: preferenceId, redirectMode: 'self' }}
				onReady={handleOnReady}
			/>
		)
	}



	const handleCheckout = async () => {
		setIsLoading(true)
		const arrayItems = cartState.cart.items.map((item) => ({
			title: item.name,
			unit_price: item.price, //number
			quantity: item.quantity, //number
		}))
		try {
			const data = await postOrdenPago({ items: arrayItems })
			setPreferenceId(data.preferenceId)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleEmptyCart = () => {
		deleteAllItemsFromCart()
		dispatch(resetCart())
		setIsHovered(false)
	}

	const handleIncreaseDays = (product) => {
		const cart = addToCart(product)
		dispatch(setCart(cart))
	}

	const handleDecreaseDays = (product) => {
		const cart = subFromCart(product)
		dispatch(setCart(cart))
	}

	return (
		<>
			{cartState.cart.items.length < 1 ? (
				<Navigate to={routesName.home} />
			) : (
				<div className='container mx-auto p-4 '>
					<div className='grid grid-cols-1 xl:grid-cols-12 gap-4 '>
						<div className='md:col-span-8 bg-white dark:bg-card_dark rounded-md'>
							<div className='border-b px-4 py-4'>
								<h2 className='text-4xl font'>Rental Cart</h2>
								<div className='flex mt-4 justify-between items-center'>
									<button
										onClick={handleEmptyCart}
										onMouseEnter={() => setIsHovered(true)}
										onMouseLeave={() => setIsHovered(false)}
										className='flex items-center'>
										<DeleteIcon className='stroke-dark_purple dark:stroke-light_purple cursor-pointer' />
										{isHovered && (
											<div className='ml-2'>
												<span className='text-md text-text_gray dark:text-gray_dark'>
													Empty Cart
												</span>
											</div>
										)}
									</button>

									<span className='text-xl text-text_gray dark:text-gray_dark'>Price</span>
								</div>
							</div>
							{cartState.cart.items.map((product) => (
								<div key={product.idProd} className='flex px-4 py-6 border-b h-[180px]'>
									<div className='w-1/3'>
										<img
											src={product.image}
											alt={product.name}
											className='object-cover w-full h-full md:max-w-xs'
										/>
									</div>
									<div className='flex flex-col justify-between px-4 h-full w-2/3'>
										<div>
											<h3 className='text-2xl'>{product.name}</h3>
											<p className='text-text_gray dark:text-gray_dark'>${product.price}</p>
										</div>
										<div className='flex items-center justify-between mt-4'>
											{!preferenceId ? (
												<div className='flex items-center gap-4 text-text_gray dark:text-gray_dark '>
													<button
														className='px-2 py-1 text-md text-white bg-medium_purple rounded-full'
														onClick={() => handleDecreaseDays(product)}>
														-
													</button>
													<span>{product.quantity}</span>
													<button
														className='px-2 py-1 text-sm text-white bg-medium_purple rounded-full'
														onClick={() => handleIncreaseDays(product)}>
														+
													</button>
													<span>days</span>
												</div>
											) : (
												<div></div>
											)}
											<span className='font-semibold text-2xl self-end'>
												${(product.price * product.quantity).toFixed(2)}{' '}
												<span className='text-base'>{cartState.cart.currency}</span>
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className='md:col-span-4'>
							<div className='bg-white dark:bg-card_dark rounded-md shadow p-4 min-h-[200px] max-h-[250px]'>
								<div className='flex items-center justify-between mb-4'>
									<span className='text-2xl'> Total ({cartState.cart.items.length} items):</span>
									<span className='text-3xl font-semibold'>
										${cartState.cart.total}{' '}
										<span className='text-lg'>{cartState.cart.currency}</span>
									</span>
								</div>
								{!preferenceId && !loading ? (
									<button
										className='text-center text-xl w-full px-4 py-2 bg-medium_purple text-white rounded hover:bg-dark_purple'
										onClick={handleCheckout}>
										Checkout
									</button>
								) : loading ? (
									<Loader />
								) : (
									''
								)}
								{renderCheckoutButton(preferenceId)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Checkout
