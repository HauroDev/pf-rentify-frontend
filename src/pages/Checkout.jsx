import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { initMercadoPago } from '@mercadopago/sdk-react'
import { MERCADOPAGO_PUBLIC_KEY } from '../mercadopacgo.config'
import { Wallet } from '@mercadopago/sdk-react'
import { Navigate } from 'react-router-dom'
import { routesName } from '../utils/routes_name'
import { postOrdenPago } from '../services/MercadoService'
import { getCart } from '../services/cartService'
import Loader from '../components/Loader'

initMercadoPago(MERCADOPAGO_PUBLIC_KEY)
const initialState = getCart()

const Checkout = () => {
	const cartState = useSelector((state) => state.cart)
	const [isReady, setIsReady] = useState(false)
	const [preferenceId, setpreferenceId] = useState(null)
	const [loading, setIsLoading] = useState(false)
	const [cart, setICart] = useState(initialState)

	useEffect(() => {
		setICart(getCart())
	}, [cartState.cart.items])

	if (!cart.items.length) {
		return <Navigate to={routesName.home} />
	}

	const handleOnReady = () => {
		setIsReady(true)
	}

	const renderCheckoutButton = (preferenceId) => {
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
		console.log(arrayItems)
		try {
			const data = await postOrdenPago({ items: arrayItems })
			setpreferenceId(data.preferenceId)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div>
			{cartState.cart.items.map((product) => (
				<div key={product.idProd}>
					<h3>{product.name}</h3>
					<h3>
						{product.price} {cartState.cart.currency}
					</h3>
					<h3>quantity:{product.quantity}</h3> <hr />
				</div>
			))}
			<p>total:{cartState.cart.total}</p>
			{!preferenceId && !loading ? (
				<button onClick={handleCheckout}>checkout</button>
			) : loading ? (
				<Loader />
			) : (
				''
			)}
			{renderCheckoutButton(preferenceId)}
		</div>
	)
}

export default Checkout
