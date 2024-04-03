import { useNavigate } from "react-router-dom";
import { getCartValue } from "../../Helper/helper";
import CardRow from "./CardRow";
import { useSelector } from "react-redux";

export const GenericModal = () => {
    const { cartItems, DatabaseItem } = useSelector((state) => state.cart)
    const navigate = useNavigate()
    return (
        <div className="flex items-center sm:justify-start md:justify-center">
            <div className="absolute p-4 ">
                <div className="absolute rounded-lg shadow bg-gray-200">
                    <div className="p-3">
                        <div className=" scroll h-32 sm:w-60 overflow-y-scroll scroll-smooth focus:scroll-auto">
                            {
                                cartItems && cartItems.length > 0
                                    ?
                                    cartItems.map(element => {
                                        return (
                                            <CardRow name={element.name} value={"$" + `${element.price}`} />
                                        )
                                    })
                                    : <p className="flex text-wrap justify-center text-md font-bold tracking-tight truncate text-gray-400 dark:text-gray-400">
                                        Go To CheckOut for Detail of Previous Cart Products
                                    </p>
                            }
                            {
                                DatabaseItem && DatabaseItem.length > 0
                                &&
                                DatabaseItem.map(element => {
                                    return (
                                        <CardRow name={element.name} value={"$" + `${element.price}`} />
                                    )
                                })
                            }
                        </div>
                        <div className="flex-1 mt-4">
                            <button autoFocus onClick={() => {
                                navigate("/cartdashboard")
                            }}
                                data-modal-hide="popup-modal"
                                type="button"
                                className=" text-white bg-primary-800 hover:bg-primary-700 focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto"
                            >
                                Go To CheckOut
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >)
}