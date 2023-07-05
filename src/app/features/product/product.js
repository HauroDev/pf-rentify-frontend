import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserProducts,
  updateProductstatusPub,
} from "../../../services/profile";
import { localStorageItems } from "../../../utils/localStorageItems";

const initialState = {
  product: [],
  status: "idle",
  error: null,
};
export const fetchUserProducts = createAsyncThunk(
  "productsUser/fetchUserProducts",
  async (id) => {
    try {
      return await getUserProducts(id);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
export const upDateUserProductStatus = createAsyncThunk(
  "productsUser/upDateUserProductStatus",
  async ({ idProd, statusPub }) => {
    try {
      console.log(idProd, statusPub);
      console.log("REDUX");
      return await updateProductstatusPub({ idProd, statusPub });
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

const productSlice = createSlice({
  name: "productsUser",
  initialState,
  reducers: {
    setProductName: (state, action) => {
      state.product = action.payload;
      localStorage.setItem(
        localStorageItems.userProducts,
        JSON.stringify({ product: state.product })
      );
      updateLocalStorage(state);
    },
    setProductStatusPub: (state, action) => {
      const { productId, statusPub } = action.payload;
      const productFound = state.product.find(
        (product) => product.idProd === productId
      );
      productFound.statusPub = statusPub;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.product = action.payload;
      })
      .addCase(fetchUserProducts.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      ///UpDateProductStatus
      .addCase(upDateUserProductStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(upDateUserProductStatus.fulfilled, (state, action) => {
        state.status = "success";
        const { idProd, statusPub } = action.payload;
        const productFound = state.product.find(
          (product) => product.idProd === idProd
        );
        console.log(productFound);
        productFound.statusPub = statusPub;
      })
      .addCase(upDateUserProductStatus.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { setProductName, setProductStatusPub } = productSlice.actions;

export default productSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getUserProducts } from "../../../services/profile";
// import { localStorageItems } from "../../../utils/localStorageItems";
// const initialState = {
//   product: [],
//   status: "idle",
//   error: null,
// };

// export const fetchUserProducts = createAsyncThunk(
//   "products/fetchUserProducts",
//   async (id) => {
//     try {
//       return await getUserProducts(id);
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   }
// );

// const productSlice = createSlice({
//   name: "productsUser",
//   initialState,
//   reducers: {
//     setProductName: (state, action) => {
//       state.product = action.payload;
//       localStorage.setItem(
//         localStorageItems.userProducts,
//         JSON.stringify({ product: state.product })
//       );
//     },
//     setProductStatusPub: (state, action) => {
//       state.product.statePub = action.payload.statePub; // Actualiza solo la propiedad statePub
//       console.log(state.product);
//       localStorage.setItem(
//         localStorageItems.userProducts,
//         JSON.stringify({ product: state.product })
//       );
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserProducts.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchUserProducts.fulfilled, (state, action) => {
//         state.status = "success";
//         state.product = action.payload;
//       })
//       .addCase(fetchUserProducts.rejected, (state, action) => {
//         state.status = "error";
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setProductName, setProductStatusPub } = productSlice.actions;

// export default productSlice.reducer;
////////////
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getUserProducts } from "../../../services/profile";
// import { updateProductstatusPub } from "../../../services/profile";

// const initialState = {
//   product: [],
//   status: "idle",
//   error: null,
// };

// export const fetchUserProducts = createAsyncThunk(
//   "products/fetchUserProducts",
//   async (id) => {
//     try {
//       return await getUserProducts(id);
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   }
// );

// const productSlice = createSlice({
//   name: "product",
//   initialState,
//   reducers: {
//     setProductName: (state, action) => {
//       state.product.name = action.payload;
//       localStorage.setItem(
//         localStorageItems.userAuth,
//         JSON.stringify({ product: state.product })
//       );
//     },
//     setProductStatusPub: (state, action) => {
//       state.product.statusPub = action.payload;
//       localStorage.setItem(
//         localStorageItems.userAuth,
//         JSON.stringify({ product: state.product })
//       );
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserProducts.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchUserProducts.fulfilled, (state, action) => {
//         state.status = "success";
//         state.product = action.payload;
//       })
//       .addCase(fetchUserProducts.rejected, (state, action) => {
//         state.status = "error";
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setProductName, setProductStatusPub } = productSlice.actions;

// export default productSlice.reducer;
