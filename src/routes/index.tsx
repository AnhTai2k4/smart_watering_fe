import type React from "react"
import DevicePage from "../pages/DevicePage/DevicePage"
import LoginPage from "../pages/LoginPage/LoginPage"
import GroupPage from "../pages/GroupPage/GroupPage"
import ConfigPage from "../pages/ConfigPage/ConfigPage"
import SignupPage from "../pages/SignupPage/SignupPage"
import ForgetPage from "../pages/ForgetPage/ForgetPage"
import DataDevicePage from "../pages/DataDevicePage/DataDevicePage"
import ScheduleDevicePage from "../pages/ScheduleDevicePage/ScheduleDevicePage"
import ScheduleGroupPage from "../pages/ScheduleGroupPage/ScheduleGroupPage"
import DataGroupPage from "../pages/DataGroupPage/DataGroupPage"
import HomePage from "../pages/HomePage/HomePage"
import ChangePasswordPage from "../pages/ChangePasswordPage/ChangePasswordPage"
import EmailVerificationPage from "../pages/EmailVerificationPage/EmailVerificationPage"
import IntroducePage from "../pages/IntroducePage/IntroducePage"


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
        path: "/home_page",
        element: <HomePage />,
        showHeader: true,
        showFooter: true
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
        showFooter: false
    },
    {
        path: "/data_device_page",
        element: <DataDevicePage />,
        showHeader: true,
        showFooter: true
    },
    {
        path: "/schedule_device_page",
        element: <ScheduleDevicePage />,
        showHeader: true,
        showFooter: true
    },
    {
        path: "/schedule_group_page",
        element: <ScheduleGroupPage />,
        showHeader: true,
        showFooter: true
    },
    {
        path: "/data_group_page",
        element: <DataGroupPage />,
        showHeader: true,
        showFooter: true
    },
    {
        path: "/change_password_page",
        element: <ChangePasswordPage />,
        showHeader: true,
        showFooter: false
    },
    {
        path: "/email_verification_page",
        element: <EmailVerificationPage />,
        showHeader: true,
        showFooter: false
    },
    {
        path: "/introduce",
        element: <IntroducePage />,
        showHeader: true,
        showFooter: true
    },
]

export default routes
