import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isloading: true,
    DatabaseItem: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
        },
        increment: (state, actions) => {
            // console.log(actions);
            if (actions.payload) {
                let result = [...state.cartItems, actions.payload]
                state.cartItems = result
            }
        },
        AddToDatabaseItem: (state, actions) => {
            // actions.payload => array
            // console.log(actions);
            if (actions.payload && actions.payload.length > 0) {
                state.DatabaseItem = actions.payload;
            }
        },
        Signout: (state) => {
            state.cartItems = []
            state.DatabaseItem = []
        }
    }
})
console.log(cartSlice);


export const { clearCart, increment, AddToDatabaseItem, Signout } = cartSlice.actions;

export default cartSlice.reducer;