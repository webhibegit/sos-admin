import React from 'react'
import Sidebar from '../scenes/global/Sidebar'
import Topbar from '../scenes/global/Topbar'
import { Outlet } from 'react-router-dom'

const Layout = ({ isSidebar, setIsSidebar }) => {
    return (
        <div>
            <div className="app">
                <Sidebar isSidebar={isSidebar} />
                <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout
