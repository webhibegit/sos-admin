import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {
    const userToken = localStorage.getItem("userDataSos");
    console.log("privvrr", userToken)
    if (userToken) {
        return <Outlet />
    } else {
        return <Navigate to={'/login'} />
    }
}

export default PrivateRouter
