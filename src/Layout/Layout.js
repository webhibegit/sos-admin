import React, { useState } from 'react'
import Sidebar from '../scenes/global/Sidebar'
import Topbar from '../scenes/global/Topbar'
import { Outlet } from 'react-router-dom'

const Layout = ({ isSidebar, setIsSidebar }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // console.log("Layout")
    return (
        <div>
            <div className="app">
                <Sidebar isSidebar={isSidebar} setIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed} />
                <main className={isCollapsed ? 'content content-collpse' : "content"}>
                    <Topbar setIsSidebar={setIsSidebar} />
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout
