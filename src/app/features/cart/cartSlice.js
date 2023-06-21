import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	cart: {
		items: [],
		total: 0,
		currency: '',
	},
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCart: (state, action) => {
			state.cart = action.payload
		},
		getCart: (state) => state.cart,
		resetCart: () => initialState,
	},
})
export const { setCart, getCart, resetCart } = cartSlice.actions
export default cartSlice.reducer
