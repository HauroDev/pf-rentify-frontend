// User Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postUsers } from '../../../services/userService'

const initialState={

    users:[]
}

export const CreatePostUser= createAsyncThunk (
'user/CreatPostUser',
async () => {
    try {
        return await postUsers
    } catch (error) {
        return Promise.reject(error)
    }
}
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(CreatePostUser.fulfilled, (state, action) => {
        // Actualizar el estado con los datos de la respuesta si es necesario
        state.users.push(action.payload);
      });
    }
  });
  
  export default userSlice.reducer;