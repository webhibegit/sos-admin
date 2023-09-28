import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {
    const userToken = localStorage.getItem("userDataSos");

    if (userToken) {
        console.log("privvrr", userToken);
        return <Outlet />
    } else {
        return <Navigate to={'/login'} />
    }
}

export default PrivateRouter
