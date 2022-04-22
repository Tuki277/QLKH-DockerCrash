import { configureStore } from "@reduxjs/toolkit";
import { loginSystemReducer } from "../features/login";
import { productReducer } from "../features/product";
import { systemReducer } from "../features/system";

export const store = configureStore ({
    reducer: {
        systemLogin: loginSystemReducer,
        product: productReducer,
        system: systemReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch