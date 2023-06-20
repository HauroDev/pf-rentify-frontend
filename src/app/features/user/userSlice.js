// User Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postUsers } from '../../../services/userService'

const initialState = {
	user: {},
	login: false,
}

export const CreatePostUser = createAsyncThunk('user/CreatPostUser', async (user) => {
	try {
		console.log(user)
		return await postUsers(user)
	} catch (error) {
		return Promise.reject(error)
	}
})
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// reinico del stado
		resetUser: () => {
			return initialState
		},
	},
	extraReducers: (builder) => {
		builder.addCase(CreatePostUser.fulfilled, (state, action) => {
			// Actualizar el estado con los datos de la respuesta si es necesario
			state.user = action.payload
			state.login = true
		})
	},
})
// exportacion de actions
export const { resetUser } = userSlice.actions

export default userSlice.reducer
