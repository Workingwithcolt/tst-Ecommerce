import { NavLink, useLocation } from 'react-router-dom'
import { SignOut } from '../userProfile/SignOut'
import { useState } from 'react';
import { CURRENT_USER_ID, getCartValue } from '../../Helper/helper';
import { IoCartOutline } from "react-icons/io5";
import { GenericModal } from './GenericModal';

function Header() {
    const { pathname } = useLocation();
    const [showModal, setshowModal] = useState(false);
    var parsedValue = getCartValue()
    var currentUser = sessionStorage.getItem(CURRENT_USER_ID);

    if (currentUser) {
        currentUser = JSON.parse(currentUser)
    } else {
        currentUser = undefined;
    }

    return (
        <nav className="bg-gray-900 border-gray-200 relative">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-base font-semibold whitespace-nowrap text-white">Ticket Manager</span>
                </NavLink>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <ul className="flex font-sm px-4 mr-4 text-white space-x-2 gap-4">
                        <li>
                            <button onClick={() => setshowModal(!showModal)}>
                                <span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 ">
                                    < IoCartOutline size={25} color={pathname === '/LoginRegister' ? '#3B82F6' : undefined} />
                                    <div className='text-xl text-center'>{parsedValue?.length}</div>
                                </span>
                            </button>
                        </li>
                    </ul>
                    {
                        currentUser?.uid
                        &&
                        <div
                            type="button"
                            className="flex text-white rounded-full items-center justify-center w-8 h-8"
                        >
                            <SignOut />
                        </div>}
                </div>
            </div>
            {
                showModal && <GenericModal />
            }
        </nav>
    )
}

export default Header