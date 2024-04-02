import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});
const SESSION_STORAGE_KEY_SCHOOL = "currentUser";

export function UserContextProvider({ children }) {
    const [currentUserAdmin, changeCurrentUserAdmin] = useState({ name: "" });
    const [cart, setCart] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])

    useEffect(() => {
        var currentUser = sessionStorage.getItem(SESSION_STORAGE_KEY_SCHOOL);
        if (currentUser) {
            changeCurrentUserAdmin(JSON.parse(currentUser));
        }
    }, [])

    const setCartItem = (element) => {
        // clearCart()
        let cartItems = localStorage.getItem('cartItems')
        var parsedValue = undefined;
        var result = []
        if (cartItems) {
            parsedValue = JSON.parse(cartItems)
        }
        if (parsedValue) {
            result = [...parsedValue, element]
        } else {
            result = [element]
        }

        localStorage.setItem("cartItems", JSON.stringify(result))
        setCart(result);
    }


    const setCurrentUserAdmin = (currentUser) => {
        sessionStorage.setItem(
            SESSION_STORAGE_KEY_SCHOOL,
            JSON.stringify(currentUser));

        changeCurrentUserAdmin(currentUser);
    }

    return (
        <UserContext.Provider value={{ currentUserAdmin, setCurrentUserAdmin, cart, setCartItem }} >
            {children}
        </UserContext.Provider>
    )
}