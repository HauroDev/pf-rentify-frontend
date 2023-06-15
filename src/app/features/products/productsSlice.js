import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllProducts } from '../../../services/productService'

const initialState = {
	products: [],
	productDetail: {},
	status: 'idle',
	error: null,
	next: null,
}

export const fetchGetAllProductsAsync = createAsyncThunk(
	'products/fetchGetAllProduct',
	async () => {
		try {
			return await getAllProducts()
		} catch (error) {
			return Promise.reject(error)
		}
	}
)

const productsSlice = createSlice({
	name: 'products',
	initialState,
	extraReducers: (builder) => {
		builder
			// GET PRODUCTS
			.addCase(fetchGetAllProductsAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchGetAllProductsAsync.fulfilled, (state, action) => {
				state.status = 'success'
				state.products = action.payload.results
				state.next = action.payload.next
			})
			.addCase(fetchGetAllProductsAsync.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})
	},
})

export default productsSlice.reducer
