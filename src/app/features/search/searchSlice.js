import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProductByName, getMoreProductByName } from '../../../services/searchService'

const initialState = {
	search: '',
	products: [],
	status: 'idle',
	error: null,
	next: null,
}

export const fetchGetProductByNameAsync = createAsyncThunk(
	'search/fetchGetProductByName',
	async (name) => {
		try {
			return await getProductByName(name)
		} catch (error) {
			return Promise.reject(error.responser.data.error)
		}
	}
)

export const fetchGetMoreProductByNameAsync = createAsyncThunk(
	'search/fetchGetMoreProductByName',
	async (url) => {
		try {
			return await getMoreProductByName(url)
		} catch (error) {
			return Promise.reject(error.responser.data.error)
		}
	}
)

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		resetSearch: (state) => {
			state.products = []
			state.error = null
			state.status = 'idle'
			state.next = null
		},
		resetError: (state) => {
			state.error = null
		},
		resetStatus: (state) => {
			state.status = 'idle'
		},
		setSearch: (state, action) => {
			state.search = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			// GET PRODUCT NAME
			.addCase(fetchGetProductByNameAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchGetProductByNameAsync.fulfilled, (state, action) => {
				state.status = 'success'
				state.products = action.payload.results
				state.next = action.payload.next
			})
			.addCase(fetchGetProductByNameAsync.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})
			// GET MORE PRODUCT NAME
			.addCase(fetchGetMoreProductByNameAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchGetMoreProductByNameAsync.fulfilled, (state, action) => {
				state.status = 'success'
				state.products = [...state.products, ...action.payload.results]
				state.next = action.payload.next
			})
			.addCase(fetchGetMoreProductByNameAsync.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})
	},
})

export const { resetSearch, resetError, resetStatus, setSearch } = searchSlice.actions
export default searchSlice.reducer
