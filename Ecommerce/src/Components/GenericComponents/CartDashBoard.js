import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Auth"
import { clearCart, getCartValue } from "../../Helper/helper";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CART, endpoints } from "../../FirebaseHelpers/ApiInterface";
import LoadingSpinner from "./LoadingSpinner";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";

export const CardDashBoard = () => {
    const { currentUserObject } = useContext(AuthContext);
    const CartData = getCartValue()
    const uid = currentUserObject.uid;
    const queryClient = useQueryClient()

    const [status, setStatus] = useState({
        isloading: false,
        data: []
    })

    const InvalidateCart = async () => {
        await queryClient.invalidateQueries({
            predicate: (query) =>
                query.queryKey.includes(CART)
        })
    }

    useEffect(() => {
        if (CartData && CartData.length > 0) {
            setStatus({
                isloading: true,
                data: []
            })
            let result = Promise.all(CartData?.map(async (element) => {
                element.owner = uid;
                await endpoints.Cart.addDocument(element);
                return element;
            }))
            setStatus({
                isloading: false,
                data: result
            })
            clearCart()
        }
    }, [])

    const getCartElement = async () => {
        var databaseQuery = []
        databaseQuery = [['owner', "==", uid]]
        return await endpoints.Cart.getAllDocument(databaseQuery)
    }

    const AddQuanity = async (item) => {
        setStatus({
            isloading: true,
            data: []
        })
        item.quantity = item.quantity + 1
        await endpoints.Cart.updateDocument(item.id, item);
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
        item.quantity = item.quantity - 1
        if (item.quantity <= 0) {
            await endpoints.Cart.deleteDocument(`${item.id}`);
        } else {
            await endpoints.Cart.updateDocument(item.id, item);
        }
        setStatus({
            isloading: false,
            data: []
        })
        InvalidateCart()
    }

    const { data: CartFirebaseData, isloading } = useQuery({
        queryFn: async () => await getCartElement(),
        queryKey: [uid, CART]
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

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
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