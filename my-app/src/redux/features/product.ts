import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IProductDocument,
  IProductDocumentPost,
  IProductDocumentUpdate,
  IProductResponse,
  IResponseProduct,
} from "../../interface";
import API from "../../Utils/API";

export const getAllProduct = createAsyncThunk("Product/getAll", async () => {
  const res = await API.get<IResponseProduct<IProductDocument>>("/product");
  return res.data;
});

export const addProduct = createAsyncThunk("Product/add", async (item: IProductDocumentPost) => {
    const res = await API.post("/product", item)
    return res.data;
})

export const deleteProduct = createAsyncThunk(
  "Product/DeleteProduct",
  async (id: string) => {
    const res = await API.delete(`/product/${id}`);
    return res.data;
  }
);

export const finishProduct = createAsyncThunk("Product/Finish", async (id: string) => {
  const res = await API.patch(`/product/action=finish/${id}`);
  return res.data;
})

export const rejectProduct = createAsyncThunk("Product/Reject", async (id: string) => {
  const res = await API.patch(`/product/action=reject/${id}`);
  return res.data
})

export const deliveredProduct = createAsyncThunk("Product/Delivered", async (id: string) => {
  const res = await API.patch(`/product/action=delivered/${id}`);
  return res.data
})

export const getProductById = createAsyncThunk("Product/GetById", async (id: string) => {
  const res = await API.get(`/product/${id}`)
  return res.data
})

export const searchProduct = createAsyncThunk("Product/Search", async(name: string) => {
  const res = await API.post('/search', { NameProduct: name})
  return res.data
})

export const filterProduct = createAsyncThunk("Product/Filter", async (status: string) => {
  const res = await API.post('product/filter', { Status: status })
  return res.data
})

export const updateProduct = createAsyncThunk("Product/Update", async(modelUpdate: IProductDocumentUpdate<IProductDocumentPost>) => {
  const res = await API.patch(`product/${modelUpdate.id}`, modelUpdate.model)
  return res.data
})

const initialState: IProductResponse = {
  product: undefined,
  productDetail: undefined,
  addResult: undefined
};

const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    getAddProductResult (state) {
      state.addResult = state.productDetail
    }
  },
  extraReducers: (builder) => {
    builder.addCase(deleteProduct.fulfilled, (state, action) => {});
    builder.addCase(finishProduct.fulfilled, (state, action) => {});
    builder.addCase(rejectProduct.fulfilled, (state, action) => {});
    builder.addCase(deliveredProduct.fulfilled, (state, action) => {});
    builder.addCase(getAllProduct.fulfilled, (state, action: any) => {
      state.product = action.payload;
    });
    builder.addCase(filterProduct.fulfilled, (state, action) => {
      state.product = action.payload;
    })
    builder.addCase(searchProduct.fulfilled, (state, action) => {
      state.product = action.payload;
    })
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.productDetail = action.payload;
    })
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.productDetail = action.payload;
    })
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.productDetail = action.payload;
    })
  },
});

export const productReducer = productSlice.reducer;

export const {
  getAddProductResult
} = productSlice.actions
