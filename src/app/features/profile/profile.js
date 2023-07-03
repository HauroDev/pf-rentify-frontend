import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUser } from '../../../services/userService'

const initialState = {
	user: {},
	login: false,
	status: 'idle',
	error: null,
}

export const profileId = createAsyncThunk('profile/profileId', async (id) => {
	try {
		return await getUser(id)
	} catch (error) {
		return Promise.reject(error.responser.data.error)
	}
})

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
			state.login = true
			state.status = 'success'
		},
		resetUser: (state) => {
			state.user = {}
			state.login = false
			state.status = 'idle'
			state.error = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(profileId.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(profileId.fulfilled, (state, action) => {
				state.status = 'success'
				state.user = action.payload
			})
			.addCase(profileId.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})
	},
})

export const { setUser, resetUser } = profileSlice.actions
export default profileSlice.reducer
