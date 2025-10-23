import axios from "axios";

export const createDevice = async (deviceId: String, deviceName: String) => {
    const token = localStorage.getItem("token")
    console.log(token)
    const res = await axios.post(`${import.meta.env.VITE_BE_URL}/devices`,{
        "deviceId": deviceId,
        "name": deviceName
    },{
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })

    return res.data

}