import type React from "react"
import DevicePage from "../pages/DevicePage/DevicePage"
import LoginPage from "../pages/LoginPage/LoginPage"
import GroupPage from "../pages/GroupPage/GroupPage"
import ConfigPage from "../pages/ConfigPage/ConfigPage"

interface RouteType {
    path: string,
    element: React.ReactNode,
    showHeader: boolean,
}

const routes : RouteType[] = [
    {
        path:  "/",
        element: <DevicePage/>,
        showHeader: true,
    },
    {
        path: "/device_page",
        element: <DevicePage></DevicePage>,
        showHeader: true,
        
    },
    {
        path: "/login_page",
        element: <LoginPage/>,
        showHeader: false,
    },
    {
        path: "/group_page",
        element: <GroupPage></GroupPage>,
        showHeader: true,
    },
    {
        path: "/config_page",
        element: <ConfigPage></ConfigPage>,
        showHeader: true,
    },
]

export default routes
