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
    <div className="container mx-auto p-4 ">
  <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 ">
    <div className="md:col-span-8  bg-white ">
      <div className="border-b px-4 py-4">
      <h2 className="text-4xl font">Rental Cart</h2>
      <div className='flex items-center justify-end'>
        <span className="text-xl text-text_gray">Price</span>
      </div>
      </div>
          {cartState.cart.items.map((product) => (
            <div
              key={product.idProd}
              className="flex px-4 py-6 border-b h-[180px]"
            >
              <div className="w-1/3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full md:max-w-xs"
                />
              </div>
              <div className="flex flex-col justify-between p-4 w-2/3">
                <div>
                  <h3 className="text-2xl">{product.name}</h3>
                  <p className="text-text_gray">${product.price}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-text_gray">
                    Days: {product.quantity}
                  </span>
                  <span className="font-semibold text-2xl">
                    ${product.price * product.quantity} <span className="text-base">{cartState.cart.currency}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="md:col-span-4 ">
          <div className="bg-white rounded-md shadow p-4 min-h-[200px] max-h-[250px]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl"> Total ({cartState.cart.items.length} items):</span>
              <span className="text-3xl font-semibold">
                ${cartState.cart.total} <span className="text-lg">{cartState.cart.currency}</span>
              </span>
            </div>
            {!preferenceId && !loading ? (
                  <button  className="text-center text-2xl w-full px-4 py-2 bg-medium_purple text-white rounded hover:bg-dark_purple"onClick={handleCheckout}>Checkout</button>
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
  );
}

export default Checkout
