import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllProducts, getProductById,createProduct } from '../../../services/productService'

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

export const fetchGetProductByIdAsync = createAsyncThunk(
	'products/fetchGetProductById',
	async (id) => {
		try {
			return await getProductById(id)
		} catch (error) {
			return Promise.reject(error)
		}
	}
)

// ! creación de post
export const fetchPostProductAsync = createAsyncThunk(
	'products/fetchPostProduct',
	async (productDetail) => {
		try {
			return await createProduct(productDetail)
		} catch (error) {
			return Promise.reject(error)
		}
	}
)

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		resetDetail: (state) => {
			state.productDetail = {}
		},
		resetError: (state) => {
			state.error = null
		},
	},
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

			// GET PRODUCT ID
			.addCase(fetchGetProductByIdAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchGetProductByIdAsync.fulfilled, (state, action) => {
				state.status = 'success'
				state.productDetail = action.payload
				state.next = null
			})
			.addCase(fetchGetProductByIdAsync.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})

			// ! POST PRODUCT
			.addCase(fetchPostProductAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchPostProductAsync.fulfilled, (state, action) => {
				state.status = 'success'
				state.products = [...state.products,action.payload]
			})
			.addCase(fetchPostProductAsync.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})
	},
})

export const { resetDetail, resetError } = productsSlice.actions
export default productsSlice.reducer
