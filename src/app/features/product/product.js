import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserProducts,
  updateProductstatusPub,
} from "../../../services/profile";

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
      console.log(error);
      return Promise.reject(error);
    }
  }
);

const productSlice = createSlice({
  name: "productsUser",
  initialState,
  reducers: {
    setProductName: (state, action) => {
      const { idProd, name } = action.payload;
      const productFound = state.product.find(
        (product) => product.idProd === idProd
      );
      productFound.name = name;
    },
    setProductPrice: (state, action) => {
      const { idProd, price } = action.payload;
      const productFound = state.product.find(
        (product) => product.idProd === idProd
      );
      productFound.price = price;
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
        if (statusPub !== "deleted") {
          const productFound = state.product.find(
            (product) => product.idProd === idProd
          );
          console.log(productFound);
          productFound.statusPub = statusPub;
        } else {
          state.product = state.product.filter(
            (product) => product.idProd !== idProd
          );
        }
      })
      .addCase(upDateUserProductStatus.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { setProductName, setProductStatusPub, setProductPrice } =
  productSlice.actions;

export default productSlice.reducer;
