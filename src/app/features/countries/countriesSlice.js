import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllCountries } from '../../../services/locationService'

const initialState = {
	countries: [],
	status: 'idle',
	error: null,
}

export const fetchGetAllCountriessAsync = createAsyncThunk(
	'countries/fetchGetAllCountries',
	async () => {
		try {
			return await getAllCountries()
		} catch (error) {
			return Promise.reject(error.responser.data.error)
		}
	}
)

const countriesSlice = createSlice({
	name: 'countries',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchGetAllCountriessAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchGetAllCountriessAsync.fulfilled, (state, action) => {
				state.status = 'success'
				state.countries = action.payload
			})
			.addCase(fetchGetAllCountriessAsync.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})
	},
})

export default countriesSlice.reducer
