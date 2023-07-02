import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postComment, getComment } from '../../../services/commentService'

const initialState = {
	comment: {},
	login: false,
	status: 'idle',
	error: null,
}

export const CreateComment = createAsyncThunk('', async (comment) => {
	try {
		console.log(comment)
		return await postComment(comment)
	} catch (error) {
		return Promise.reject(error.response.data.error)
	}
})

export const AllComment = createAsyncThunk('allComment', async (comment) => {
	try {
		console.log(comment)
		return await getComment(comment)
	} catch (error) {
		throw new Error(error.message)
	}
})

const commentSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {
		// reinico del stado
		setComment: (state, action) => {
			state.comment = action.payload
			state.login = true
			state.status = 'success'
		},
		resetComment: (state) => {
			state.comment = {}
			state.login = false
			state.status = 'idle'
			state.error = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(CreateComment.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(CreateComment.fulfilled, (state, action) => {
				state.comment = action.payload
				state.login = true
				state.status = 'success'
			})
			.addCase(CreateComment.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})
			// all comentarios
			.addCase(AllComment.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(AllComment.fulfilled, (state, action) => {
				state.comment = action.payload
				state.login = true
				state.status = 'success'
			})
			.addCase(AllComment.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error.message
			})
	},
})
// exportacion de actions
export const { resetComment, setComment } = commentSlice.actions

export default commentSlice.reducer
