import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../FirebaseHelpers/firebase-config";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { Signout } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export function SignOut() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const state = useSelector((state) => state.cart)
    console.log(state);
    console.log("it is state");
    const logout = async () => {
        try {
            // If another user log-in from the same tab.
            // We want the sessionStorage to be cleared
            // before he can see some lingering value.
            navigate("/")
            sessionStorage.clear();
            await auth.signOut();
            dispatch(Signout())
            // window.location.reload(true);

        }
        catch (e) { console.log(e); }
    }

    return (
        <button onClick={logout}>
            <LiaSignOutAltSolid size={25} />
        </button>
    )
}