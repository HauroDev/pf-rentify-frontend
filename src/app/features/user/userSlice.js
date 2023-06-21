// User Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser, registerGoogle, registerUser,loginGoogle } from '../../../services/authSevice'

const initialState = {
	user: {},
	login: false,
	status:'idle',
	error:null
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

export const CreateUserGoogle = createAsyncThunk('user/CreateUserGoogle',async(user)=>{
	try {
		return await registerGoogle(user)
	} catch (error) {
		return Promise,reject(error)
	}
})

export const LoginUserDB=createAsyncThunk('user/LoginUserDB',async(user)=>{
	try {
		return await loginUser(user)
	} catch (error) {
		return Promise,reject(error)
	}
})

export const LoginUserGoogle= createAsyncThunk('user/LoginUserGoogle',async(user)=>{
	try {
		return await loginGoogle(user) 
	} catch (error) {
		return Promise,reject(error)
	}
})

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// reinico del stado
		setUser:(state,action)=>{
			state.user=action.payload.user;
			state.login=true;
		},
		resetUser: () => {
			return initialState
		},
	},
	extraReducers: (builder) => {
		builder
		.addCase(CreatePostUser.pending, (state) => {
			state.status = 'loading'
		})
		.addCase(CreatePostUser.fulfilled, (state, action) => {
			// Actualizar el estado con los datos de la respuesta si es necesario
			state.user = action.payload
			state.login = true
			state.status='success'
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
			// Actualizar el estado con los datos de la respuesta si es necesario
			state.user = action.payload
			state.login = true
			state.status='success'
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
			// Actualizar el estado con los datos de la respuesta si es necesario
			state.user = action.payload
			state.login = true
			state.status='success'
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
			// Actualizar el estado con los datos de la respuesta si es necesario
			state.user = action.payload
			state.login = true
			state.status='success'
		})
		.addCase(LoginUserGoogle.rejected, (state, action) => {
			state.status = 'error'
			state.error = action.error.message
		})

	},
})
// exportacion de actions
export const { resetUser , setUser} = userSlice.actions

export default userSlice.reducer
