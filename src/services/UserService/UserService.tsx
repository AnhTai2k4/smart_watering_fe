import axios from "axios"
export const login = async (userName: string, password: string) => {
    const res = await axios.post(`${import.meta.env.VITE_BE_URL}/auth/log-in`, {
        "username": userName,
        "password": password
    });
    return res.data;
}

export const getUser = async () => {
    const token = localStorage.getItem("token")
    const res = await axios.get(`${import.meta.env.VITE_BE_URL}/users`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data;
}

export const signup = async (userName: String, password: String, email: String) => {
    const res = await axios.post(`${import.meta.env.VITE_BE_URL}/users`, {
        "username": userName,
        "password": password,
        "email": email
    })
    return res;
}

export const sendOTP = async (email: string) => {
    const res = await axios.post(`${import.meta.env.VITE_BE_URL}/mail/send`, {
        "email": email
    })
    return res;
}


export const verifyOTP = async (email: string, code: string) => {
    const res = await axios.post(`${import.meta.env.VITE_BE_URL}/auth/verify`, {
        "email": email,
        "code": code
    })
    return res;
}

export const changePassword = async (email: string, newPassword: string, confirmNewPassword: string, code: string) => {
    const res = await axios.post(`${import.meta.env.VITE_BE_URL}/auth/change-password`,
        {
            email,
            newPassword,
            confirmNewPassword,
            code
        }
    )
    return res.data;
}