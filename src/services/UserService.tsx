import axios from "axios"
export const login = async (userName: string, password: string) => {
    const res = await axios.post(`${import.meta.env.VITE_BE_URL}/auth/log-in`, {
        "username":userName,
        "password":password
    });
    return res.data;
}

export const signup = async (userName: String, password: String) => {
    const res = await axios.post(`${import.meta.env.VITE_BE_URL}/users`, {
        "username":userName,
        "password":password
    })
    return res;
}
