import { configureStore,applyMiddleware } from "@reduxjs/toolkit"
import cartReducer from '../src/features/cart/cartSlice'
import { thunk } from "redux-thunk"
export const store = configureStore({
    reducer: {
        cart: cartReducer
    }
},applyMiddleware(thunk))