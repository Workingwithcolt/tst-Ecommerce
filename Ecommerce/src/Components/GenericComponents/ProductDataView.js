import { useState } from "react";
import { useParams } from "react-router-dom";
import { ItemCard } from "./ItemCard";
import SHOP_DATA from "../../Helper/data";

function ProductDataView() {
    const { id } = useParams();

    const getSearchableValue = (current) => {
        return (
            current.name
        )
    }

    var { items: data } = SHOP_DATA[id]

    const [searchString, setSearchString] = useState("");
    const [selectedItem, setSelectedItem] = useState(undefined);

    if (data && searchString !== "") {
        data = data.filter((current) => {
            var valueToSearchIn = getSearchableValue(current).toLowerCase();
            var valueToSearch = searchString.toLowerCase();
            return valueToSearchIn.includes(valueToSearch);
        })
    }

    return (
        <div className="flex flex-col gap-2 h-full mx-3 mt-0">
            <div className="flex flex-wrap w-full items-center gap-5 mb-2">
                <input className="flex-grow border mt-4 mb-4 text-white text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400"
                    onChange={(e) => setSearchString(e.target.value)}
                    placeholder="Search"
                />
            </div>
            <div className="flex-1">
                <div className=" scroll h-screen overflow-y-scroll scroll-smooth focus:scroll-auto">
                    {
                        data && data.length === 0 ?
                            <div className="flex w-full justify-center">
                                No Data To Display
                            </div>
                            :
                            <div className="grid gap-2 lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
                                {
                                    data?.map((item, index) =>
                                        <div className="w-full" key={index} onClick={() => setSelectedItem(item)}>
                                            <ItemCard item={item} />
                                        </div>
                                    )
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductDataView;