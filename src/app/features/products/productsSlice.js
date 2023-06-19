import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllProducts, getProductById, createProduct } from '../../../services/productService'
import { PRODUCTS_API } from '../../../utils/apiRoutes'

const initialState = {
	products: [],
	productDetail: {},
	status: 'idle',
	error: null,
	next: null,
	endpoint: PRODUCTS_API,
	idCategory: '',
	offset: 0,
	limit: 12,

	idCountry: '',
	stateLoc: '',
	location: '',

	order: {
		orderBy: '',
		orderType: '',
	},
}

export const fetchGetAllProductsAsync = createAsyncThunk(
	'products/fetchGetAllProduct',
	async (url) => {
		try {
			return await getAllProducts(url)
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

export const fetchGetAllProductsToFillAsync = createAsyncThunk(
	'products/fetchGetAllProductToFill',
	async (url) => {
		try {
			return await getAllProducts(url)
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
		setEndpoint: (state, action) => {
			state.endpoint = action.payload
		},
		setOrder: (state, action) => {
			state.order = {
				...action.payload,
			}
		},
		resetOrder: (state) => {
			state.order = {
				orderBy: '',
				orderType: '',
			}
		},
		setCategory: (state, action) => {
			state.idCategory = action.payload
		},
		resetCategory: (state) => {
			state.idCategory = ''
		},
		setOffset: (state) => {
			state.offset = state.offset + state.limit
		},
		setCountry: (state, action) => {
			state.idCountry = action.payload
		},
		resetCountry: (state) => {
			state.idCountry = ''
		},
		setStateLoc: (state, action) => {
			state.stateLoc = action.payload
		},
		setLocation: (state, action) => {
			state.location = action.payload
		},
		resetLocation: (state) => {
			state.location = ''
		},
		resetStateLoc: (state) => {
			state.stateLoc = ''
		},
		resetOffset: (state) => {
			state.offset = 0
		},
		resetDetail: (state) => {
			state.productDetail = {}
		},
		resetError: (state) => {
			state.error = null
		},
		resetEndpoint: (state) => {
			state.endpoint = PRODUCTS_API
		},
		resetProducState: () => initialState,
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
				state.next = null
				state.error = action.error.message
			})

			//GET PRODUCTS FILL
			.addCase(fetchGetAllProductsToFillAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchGetAllProductsToFillAsync.fulfilled, (state, action) => {
				state.status = 'success'
				state.products = [...state.products, ...action.payload.results]
				state.next = action.payload.next
			})
			.addCase(fetchGetAllProductsToFillAsync.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})

			// ! POST PRODUCT
			.addCase(fetchPostProductAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchPostProductAsync.fulfilled, (state, action) => {
				state.status = 'success'
				state.products = [...state.products, action.payload]
			})
			.addCase(fetchPostProductAsync.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})
	},
})

export const {
	resetDetail,
	resetError,
	setEndpoint,
	setOrder,
	resetEndpoint,
	resetOrder,
	setCategory,
	resetCategory,
	setOffset,
	resetOffset,
	resetProducState,
	setCountry,
	resetCountry,
	setStateLoc,
	resetStateLoc,
	setLocation,
	resetLocation,
} = productsSlice.actions
export default productsSlice.reducer
