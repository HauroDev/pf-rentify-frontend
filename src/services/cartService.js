import { localStorageItems } from '../utils/localStorageItems'

export const getCart = () => {
	let cart = localStorage.getItem(localStorageItems.cart)
		? JSON.parse(localStorage.getItem(localStorageItems.cart))
		: { items: [], total: 0 }

	return cart
}

// calcula el total de los elementos del cart
// devuelve el precio como string
const addPrice = (cart) => {
	const total = cart.items.reduce((total, product) => {
		return total + product.price * product.quantity
	}, 0)
	return total.toFixed(2)
}

// Agrega al cart validando si los items son del mismo pais
// si un prod ya esta en el cart, auments sus cantidades, si no esta, solo lo agrega
export const addToCart = (product) => {
	let cart = getCart()
	let sameCountry = true

	if (cart.items.length) {
		sameCountry = cart.items.every((prod) => prod.country.idCountry === product.country.idCountry)
	}

	if (!sameCountry) {
		throw Error('All products must be from the same country')
	}

	const founfProduct = cart.items.find((prod) => prod.idProd === product.idProd)

	if (founfProduct) {
		if (founfProduct.quantity < 30) {
			founfProduct.quantity += 1
		}
	} else {
		cart.items.push({ ...product, quantity: 1 })
	}

	const cartTotal = addPrice(cart)
	cart.total = cartTotal
	cart.currency = product.country.currency.code

	localStorage.setItem(localStorageItems.cart, JSON.stringify(cart))
	return cart
}

// Elimina el item del cart, incluidas todas las cantidades
export const removeFromCart = (product) => {
	let cart = getCart()
	cart.items = cart.items.filter((item) => item.idProd !== product.idProd)

	const cartTotal = addPrice(cart)
	cart.total = cartTotal

	localStorage.setItem(localStorageItems.cart, JSON.stringify(cart))
	return cart
}

export const subFromCart = (product) => {
	let cart = getCart()

	const founfProduct = cart.items.find((prod) => prod.idProd === product.idProd)

	if (founfProduct) {
		founfProduct.quantity -= 1
		if (founfProduct.quantity < 1) {
			cart.items = cart.items.filter((item) => item.idProd !== product.idProd)
		}
	} else {
		cart.items.push({ ...product, quantity: 1 })
	}

	const cartTotal = addPrice(cart)
	cart.total = cartTotal

	localStorage.setItem(localStorageItems.cart, JSON.stringify(cart))
	return cart
}

export const deleteAllItemsFromCart = () => {
	localStorage.removeItem(localStorageItems.cart)
}
