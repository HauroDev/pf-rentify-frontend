// User Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  registerGoogle,
  registerUser,
  loginGoogle,
  logoutUser,
  setInitialUserDB,
} from "../../../services/authSevice";
import { localStorageItems } from "../../../utils/localStorageItems";
import { firebaseErrors } from "../../../utils/firebaseErrors";
import { userToLS } from "../../../utils/userToLS";

const initialState = {
  user: {},
  login: false,
  status: "idle",
  error: null,
  token: null,
};

export const CreatePostUser = createAsyncThunk(
  "user/CreatPostUser",
  async (user) => {
    try {
      console.log(user);
      return await registerUser(user);
    } catch (error) {
      if (error.code.includes("auth")) {
        return Promise.reject(firebaseErrors(error.code));
      }
      return Promise.reject(error.response.data.error);
    }
  }
);

export const CreateUserGoogle = createAsyncThunk(
  "user/CreateUserGoogle",
  async (user) => {
    try {
      return await registerGoogle(user);
    } catch (error) {
      if (error.code.includes("auth")) {
        return Promise.reject(firebaseErrors(error.code));
      }
      return Promise.reject(error.response.data.error);
    }
  }
);

export const LoginUserDB = createAsyncThunk(
  "user/LoginUserDB",
  async (user) => {
    try {
      return await loginUser(user);
    } catch (error) {
      if (error.code.includes("auth")) {
        return Promise.reject(firebaseErrors(error.code));
      }
      return Promise.reject(error.response.data.error);
    }
  }
);

export const LoginUserGoogle = createAsyncThunk(
  "user/LoginUserGoogle",
  async (user) => {
    try {
      return await loginGoogle(user);
    } catch (error) {
      if (error.code.includes("auth")) {
        return Promise.reject(firebaseErrors(error.code));
      }
      return Promise.reject(error.response.data.error);
    }
  }
);

export const LogoutUser = createAsyncThunk("user/LogoutUser", async () => {
  try {
    await logoutUser();
  } catch (error) {
    if (error.code.includes("auth")) {
      return Promise.reject(firebaseErrors(error.code));
    }
    return Promise.reject(error.response.data.error);
  }
});

export const setInitialUser = createAsyncThunk(
  "user/setInitialUser",
  async ({ idUser, token }) => {
    try {
      return await setInitialUserDB({ idUser, token });
    } catch (error) {
      return Promise.reject(error.response.data.error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // reinico del stado
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.login = true;
      state.status = "success";
    },
    setUserName: (state, action) => {
      state.user.name = action.payload;
      localStorage.setItem(
        localStorageItems.userAuth,
        JSON.stringify({
          user: state.user,
          login: state.login,
          token: state.token,
        })
      );
    },
    setUserPhone: (state, action) => {
      state.user.phone = action.payload;
      localStorage.setItem(
        localStorageItems.userAuth,
        JSON.stringify({
          user: state.user,
          login: state.login,
          token: state.token,
        })
      );
    },
    resetUser: (state) => {
      state.user = {};
      state.login = false;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreatePostUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CreatePostUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.login = true;
        state.status = "success";
        state.token = action.payload.auth_token.token;
        const user = userToLS(
          action.payload.user,
          action.payload.auth_token.token
        );
        localStorage.setItem(localStorageItems.userAuth, user);
      })
      .addCase(CreatePostUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      //registerGoogle/
      .addCase(CreateUserGoogle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CreateUserGoogle.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.login = true;
        state.status = "success";
        state.token = action.payload.auth_token.token;
        const user = userToLS(
          action.payload.user,
          action.payload.auth_token.token
        );

        localStorage.setItem(localStorageItems.userAuth, user);
      })
      .addCase(CreateUserGoogle.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      //login userDB
      .addCase(LoginUserDB.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LoginUserDB.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.login = true;
        state.status = "success";
        state.token = action.payload.auth_token.token;
        const user = userToLS(
          action.payload.user,
          action.payload.auth_token.token
        );
        localStorage.setItem(localStorageItems.userAuth, user);
      })
      .addCase(LoginUserDB.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      // login GOOGLE
      .addCase(LoginUserGoogle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LoginUserGoogle.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.login = true;
        state.status = "success";
        state.token = action.payload.auth_token.token;
        const user = userToLS(
          action.payload.user,
          action.payload.auth_token.token
        );
        localStorage.setItem(localStorageItems.userAuth, user);
      })
      .addCase(LoginUserGoogle.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      //INITIAL USER
      .addCase(setInitialUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(setInitialUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.login = true;
        state.status = "success";
        state.token = payload.token;
        const user = userToLS(payload.user, payload.token);
        localStorage.setItem(localStorageItems.userAuth, user);
      })
      .addCase(setInitialUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      // LOGOUT
      .addCase(LogoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LogoutUser.fulfilled, (state, { payload }) => {
        state.user = {};
        state.login = false;
        state.status = "idle";
        state.error = null;
        localStorage.removeItem(localStorageItems.userAuth);
      })
      .addCase(LogoutUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});
// exportacion de actions
export const { resetUser, setUser, setUserName, setUserPhone } =
  userSlice.actions;

export default userSlice.reducer;
