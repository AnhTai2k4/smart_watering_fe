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

export const getAllDevice= async () =>{
    const token = localStorage.getItem("token");
    const result = await axios.get(`${import.meta.env.VITE_BE_URL}/devices`,{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    })

    if(result.data) return result.data
    else {return }
}

export const deleteDevice = async(id: String) =>{
    const token = localStorage.getItem("token")
    const res = await axios.delete(`${import.meta.env.VITE_BE_URL}/devices/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    })

    if(res.data) return true
    else{return false}

}