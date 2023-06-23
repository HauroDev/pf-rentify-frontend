/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import { setCart } from '../app/features/cart/cartSlice'
import { addToCart, removeFromCart } from '../services/cartService'
import { useDispatch, useSelector } from 'react-redux'
import CartIcon from './icons/CartIcon'
import DeleteCartICon from './icons/DeleteCartICon'
import { ToastContext } from '../context/ToastContext'

const BtnAddCartCard = ({ size = 'md', product }) => {
	const [isOnCart, setIsOnCart] = useState(false)
	const { addToast } = useContext(ToastContext)

	const dispatch = useDispatch()
	const cartState = useSelector((state) => state.cart)

	useEffect(() => {
		const productFound = cartState.cart.items.find((item) => item.idProd === product.idProd)
		if (productFound) {
			setIsOnCart(true)
		} else {
			setIsOnCart(false)
		}
	}, [cartState.cart.items])

	const sizesIcon = {
		sm: 'w-4 h-4 md:w-6 md:h-6',
		md: 'w-6 h-6 md:w-8 md:h-8',
		lg: 'w-8 h-8',
	}

	const buttonPad = {
		sm: 'px-2 py-1',
		md: 'px-4 py-2',
		lg: 'px-6 py-3',
	}

	const classIcon = sizesIcon[size] || sizesIcon.md
	const classButton = buttonPad[size] || buttonPad.md

	const handleAdd = () => {
		try {
			const cart = addToCart(product)
			dispatch(setCart(cart))
			addToast({
				title: 'Success',
				description: `${product.name} was added to the cart`,
				type: 'success',
			})
		} catch (error) {
			console.log(error.message)
			addToast({ title: 'Error', description: error.message, type: 'danger' })
		}
	}
	const handleRemove = () => {
		try {
			const cart = removeFromCart(product)
			dispatch(setCart(cart))
			addToast({
				title: 'Warning',
				description: `${product.name} was removed from the cart`,
				type: 'warning',
			})
		} catch (error) {
			console.log(error.message)
			addToast({ title: 'Error', description: error.message, type: 'error' })
		}
	}

	return (
		<>
			{isOnCart ? (
				<button
					onClick={handleRemove}
					className={`bg-red-500 ${classButton} rounded hover:bg-red-700 transition-colors`}
					title='Remove from cart'>
					<DeleteCartICon className={`stroke-white ${classIcon}`} />
				</button>
			) : (
				<button
					onClick={handleAdd}
					className={`bg-medium_purple ${classButton} rounded hover:bg-dark_purple transition-colors`}
					title='Add to cart'>
					<CartIcon className={`stroke-white ${classIcon}`} />
				</button>
			)}
		</>
	)
}

export default BtnAddCartCard
