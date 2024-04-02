import { useState } from "react"
import { LoginWithEmail } from "../userProfile/LoginWithEmail"
import { SignUpWithEmail } from "../userProfile/SignUpWithEmail"
import Button from "./Button"

export const LoginRegister = () => {
    const [toggle, setToggle] = useState(true)
    return (
        <div className="flex justify-center items-center h-96">
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {
                    toggle ?
                        <LoginWithEmail />
                        : <SignUpWithEmail />
                }
                <Button
                    buttonName={toggle ? "Go To Register" : "Go To Login"}
                    type="button"
                    onPress={() => setToggle(!toggle)}
                />

            </div>
        </div>
    )
}