// User Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
	loginUser,
	registerGoogle,
	registerUser,
	loginGoogle,
	logoutUser,
} from '../../../services/authSevice'

const initialState = {
	user: {},
	login: false,
	status: 'idle',
	error: null,
}

export const CreatePostUser = createAsyncThunk('user/CreatPostUser', async (user) => {
	try {
		console.log(user)
		return await registerUser(user)
	} catch (error) {
		console.log(error)
		return Promise.reject(error)
	}
})

export const CreateUserGoogle = createAsyncThunk('user/CreateUserGoogle', async (user) => {
	try {
		return await registerGoogle(user)
	} catch (error) {
		alert('error Create2G')
		return Promise.reject(error)
	}
})

export const LoginUserDB = createAsyncThunk('user/LoginUserDB', async (user) => {
	try {
		return await loginUser(user)
	} catch (error) {
		console.log(error)
		return Promise.reject(error)
	}
})

export const LoginUserGoogle = createAsyncThunk('user/LoginUserGoogle', async (user) => {
	try {
		return await loginGoogle(user)
	} catch (error) {
		console.log(error)

		return Promise.reject(error)
	}
})

export const LogoutUser = createAsyncThunk('user/LogoutUser', async () => {
	try {
		await logoutUser()
	} catch (error) {
		return Promise.reject(error)
	}
})

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// reinico del stado
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
			.addCase(CreatePostUser.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(CreatePostUser.fulfilled, (state, action) => {
				state.user = action.payload
				state.login = true
				state.status = 'success'
			})
			.addCase(CreatePostUser.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})

			//registerGoogle/
			.addCase(CreateUserGoogle.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(CreateUserGoogle.fulfilled, (state, action) => {
				state.user = action.payload
				state.login = true
				state.status = 'success'
			})
			.addCase(CreateUserGoogle.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})

			//login userDB
			.addCase(LoginUserDB.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(LoginUserDB.fulfilled, (state, action) => {
				state.user = action.payload
				state.login = true
				state.status = 'success'
			})
			.addCase(LoginUserDB.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})
			// login GOOGLE
			.addCase(LoginUserGoogle.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(LoginUserGoogle.fulfilled, (state, action) => {
				state.user = { ...action.payload }
				state.login = true
				state.status = 'success'
			})
			.addCase(LoginUserGoogle.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})

			// LOGOUT
			.addCase(LogoutUser.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(LogoutUser.fulfilled, (state) => {
				state.user = {}
				state.login = false
				state.status = 'idle'
				state.error = null
			})
			.addCase(LogoutUser.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})
	},
})
// exportacion de actions
export const { resetUser, setUser } = userSlice.actions

export default userSlice.reducer
