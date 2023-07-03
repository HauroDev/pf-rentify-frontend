import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllCategories } from '../../../services/categoriesSevice'

const initialState = {
	categories: [],
	status: 'idle',
	error: null,
}

export const fetchGetAllCategoriesAsync = createAsyncThunk(
	'categories/fetchGetAllCategories',
	async () => {
		try {
			return await getAllCategories()
		} catch (error) {
			return Promise.reject(error.response.data.error)
		}
	}
)

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGetAllCategoriesAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchGetAllCategoriesAsync.fulfilled, (state, action) => {
				state.status = 'success'
				state.categories = action.payload
			})
			.addCase(fetchGetAllCategoriesAsync.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})
	},
})

export default categoriesSlice.reducer
