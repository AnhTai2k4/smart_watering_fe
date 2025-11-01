import type React from "react"
import DevicePage from "../pages/DevicePage/DevicePage"
import LoginPage from "../pages/LoginPage/LoginPage"
import GroupPage from "../pages/GroupPage/GroupPage"
import ConfigPage from "../pages/ConfigPage/ConfigPage"
import SignupPage from "../pages/SignupPage/SignupPage"
import ForgetPage from "../pages/ForgetPage/ForgetPage"
import DataDevicePage from "../pages/DataDevicePage/DataDevicePage"

interface RouteType {
    path: string,
    element: React.ReactNode,
    showHeader: boolean,
    showFooter: boolean
}

const routes: RouteType[] = [
    {
        path: "/",
        element: <LoginPage />,
        showHeader: false,
        showFooter: false
    },
    {
        path: "/device_page",
        element: <DevicePage />,
        showHeader: true,
        showFooter: true
    },
    {
        path: "/login_page",
        element: <LoginPage />,
        showHeader: false,
        showFooter: false
    },
    {
        path: "/signup_page",
        element: <SignupPage />,
        showHeader: false,
        showFooter: false
    },
    {
        path: "/forget_page",
        element: <ForgetPage />,
        showHeader: false,
        showFooter: false
    },
    {
        path: "/group_page",
        element: <GroupPage></GroupPage>,
        showHeader: true,
        showFooter: true
    },
    {
        path: "/config_page",
        element: <ConfigPage />,
        showHeader: true,
        showFooter: true
    },
    {
        path: "/data_device_page/:id",
        element: <DataDevicePage />,
        showHeader: true,
        showFooter: false
    },
]

export default routes
