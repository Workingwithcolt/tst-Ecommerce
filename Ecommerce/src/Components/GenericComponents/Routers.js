import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Home'
import GenericBodyCard from './GenericBodyCard'
import { SignOut } from '../userProfile/SignOut'
import { LoginWithEmail } from '../userProfile/LoginWithEmail'
import { SignUpWithEmail } from '../userProfile/SignUpWithEmail'
import { LoginRegister } from './LoginRegister'
import ProductDataView from './ProductDataView'
import { Auth } from '../../Auth'
import { CardDashBoard } from './CartDashBoard'

function Routers() {
    return (
        <Routes>
            <Route path='/'
                element={
                    <GenericBodyCard>
                        <Home />
                    </GenericBodyCard>} />

            <Route path='/LoginRegister'
                element={
                    <GenericBodyCard>
                        <LoginRegister />
                    </GenericBodyCard>} />

            <Route path='/login'
                element={
                    <LoginWithEmail />
                } />

            <Route path='/signup'
                element={
                    <SignUpWithEmail />
                } />
            <Route path='/ProductDataView/:id'
                element={
                    <GenericBodyCard>
                        <ProductDataView />
                    </GenericBodyCard>
                } />

            <Route path='/cartdashboard'
                element={
                    <Auth
                        login={<LoginRegister />}
                        dashboard={
                            <GenericBodyCard>
                                <CardDashBoard />
                            </GenericBodyCard>}
                    >
                    </Auth>
                } />

            <Route path='/signOut'
                element=
                {<SignOut />} />
        </Routes>
    )
}

export default Routers