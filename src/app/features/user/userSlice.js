// User Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
	loginUser,
	registerGoogle,
	registerUser,
	loginGoogle,
	logoutUser,
} from '../../../services/authSevice'
import { localStorageItems } from '../../../utils/localStorageItems'
import { firebaseErrors } from '../../../utils/firebaseErrors'

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
		if (error.code.includes('auth')) {
			return Promise.reject(firebaseErrors(error.code))
		}
		return Promise.reject(error.response.data.error)
	}
})

export const CreateUserGoogle = createAsyncThunk('user/CreateUserGoogle', async (user) => {
	try {
		return await registerGoogle(user)
	} catch (error) {
		if (error.code.includes('auth')) {
			return Promise.reject(firebaseErrors(error.code))
		}
		return Promise.reject(error.response.data.error)
	}
})

export const LoginUserDB = createAsyncThunk('user/LoginUserDB', async (user) => {
	try {
		return await loginUser(user)
	} catch (error) {
		if (error.code.includes('auth')) {
			return Promise.reject(firebaseErrors(error.code))
		}
		return Promise.reject(error.response.data.error)
	}
})

export const LoginUserGoogle = createAsyncThunk('user/LoginUserGoogle', async (user) => {
	try {
		return await loginGoogle(user)
	} catch (error) {
		if (error.code.includes('auth')) {
			return Promise.reject(firebaseErrors(error.code))
		}
		return Promise.reject(error.response.data.error)
	}
})

export const LogoutUser = createAsyncThunk('user/LogoutUser', async () => {
	try {
		await logoutUser()
	} catch (error) {
		if (error.code.includes('auth')) {
			return Promise.reject(firebaseErrors(error.code))
		}
		return Promise.reject(error.response.data.error)
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
				const user = JSON.stringify({
					user: action.payload,
					login: true,
				})
				localStorage.setItem(localStorageItems.userAuth, user)
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
				const user = JSON.stringify({
					user: action.payload,
					login: true,
				})
				localStorage.setItem(localStorageItems.userAuth, user)
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
				const user = JSON.stringify({
					user: action.payload,
					login: true,
				})
				localStorage.setItem(localStorageItems.userAuth, user)
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
				const user = JSON.stringify({
					user: action.payload,
					login: true,
				})
				localStorage.setItem(localStorageItems.userAuth, user)
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
				localStorage.removeItem(localStorageItems.userAuth)
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
