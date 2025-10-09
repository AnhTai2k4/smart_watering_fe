import axios from "axios"
export const login = async (userName: string, password: string) => {
    const res = await axios.post(`${import.meta.env.VITE_BE_URL}/auth/login`, {
        userName,
        password
    });
    return res.data;
}