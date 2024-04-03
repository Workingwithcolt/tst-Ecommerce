import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Auth"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CART, endpoints } from "../../FirebaseHelpers/ApiInterface";
import LoadingSpinner from "./LoadingSpinner";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { AddToDatabaseItem, clearCart } from "../../features/cart/cartSlice";

export const CardDashBoard = () => {
    const { currentUserObject } = useContext(AuthContext);
    const dispatch = useDispatch();
    const [success, setSucess] = useState(false)
    const { cartItems: CartData } = useSelector((state) => state.cart)
    const uid = currentUserObject.uid;
    const queryClient = useQueryClient()

    const [status, setStatus] = useState({
        isloading: false,
        data: []
    })
    console.log(CartData);

    const InvalidateCart = () => {
        queryClient.invalidateQueries()
    }

    useEffect(() => {
        if (CartData && CartData.length > 0) {
            setStatus({
                isloading: true,
                data: []
            })
            let result = Promise.all(CartData?.map(async (element) => {
                await endpoints.Cart.addDocument({ ...element, owner: uid });
                return element;
            }))
            setStatus({
                isloading: false,
                data: result
            })
            InvalidateCart()
            dispatch(clearCart())
        }
    }, [])

    const getCartElement = async () => {
        var databaseQuery = []
        databaseQuery = [["owner", "==", uid]]
        let result = await endpoints.Cart.getAllDocument(databaseQuery)
        setSucess(true)
        return result;
    }

    const AddQuanity = async (item) => {
        setStatus({
            isloading: true,
            data: []
        })
        await endpoints.Cart.updateDocument(item.id, { ...item, quantity: item.quantity + 1 });
        setStatus({
            isloading: false,
            data: []
        })
        InvalidateCart()
    }

    const SubstractQuantity = async (item) => {
        setStatus({
            isloading: true,
            data: []
        })
        console.log(item);
        if ((item.quantity - 1) <= 0) {
            console.log("subtract");
            await endpoints.Cart.deleteDocument(`${item.id}`);
        } else {
            await endpoints.Cart.updateDocument(item.id, { ...item, quantity: item.quantity - 1 });
        }
        setStatus({
            isloading: false,
            data: []
        })
        InvalidateCart()
    }

    const { data: CartFirebaseData, isloading } = useQuery({
        queryFn: async () => await getCartElement(),
        queryKey: [uid, CART],
    })

    const deleteItem = async (id) => {
        setStatus({ isloading: true, data: [] })

        await endpoints.Cart.deleteDocument(`${id}`);

        InvalidateCart()
        setStatus({
            isloading: false,
            data: []
        })
        alert("Product is deleted from Cart");
    }


    if (status.isloading || isloading) {
        return (<LoadingSpinner />)
    }

    if (CartFirebaseData) {
        dispatch(AddToDatabaseItem(CartFirebaseData))
    }

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Delete
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Update Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantity
                        </th>
                    </tr>
                </thead>
                <tbody className="scroll h-screen overflow-y-scroll scroll-smooth focus:scroll-auto">
                    {
                        CartFirebaseData?.map(element => {
                            return (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <img src={element.imageUrl}>
                                        </img>
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {element.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {element.category}
                                    </td>
                                    <td className="px-6 py-4">
                                        ${element.price}
                                    </td>
                                    <td onClick={() => deleteItem(element.id)} className="px-6 py-4">
                                        <MdOutlineDeleteOutline size={25} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-row">
                                            <div onClick={() => AddQuanity(element)}>
                                                <IoMdAdd size={25} />
                                            </div>
                                            <div>
                                                <RiSubtractFill onClick={() => SubstractQuantity(element)} size={25} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {element.quantity}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>

    )
}