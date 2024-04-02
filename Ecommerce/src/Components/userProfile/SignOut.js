import { auth } from "../../FirebaseHelpers/firebase-config";
import { LiaSignOutAltSolid } from "react-icons/lia";

export function SignOut() {
    const logout = async () => {
        try {
            // If another user log-in from the same tab.
            // We want the sessionStorage to be cleared
            // before he can see some lingering value.
            sessionStorage.clear();
            await auth.signOut();
            window.location.reload(true);
        }
        catch (e) { console.log(e); }
    }

    return (
        <button onClick={logout}>
            <LiaSignOutAltSolid size={25} />
        </button>
    )
}