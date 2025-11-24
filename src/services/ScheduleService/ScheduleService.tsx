import axios from "axios"

export const createSchedule = async (id:string, data: object) =>{
    const access_token = localStorage.getItem("token")
    const res = await axios.post(`${import.meta.env.VITE_BE_URL}/devices/${id}/schedule`,
        data,
        {
            headers:{
                Authorization:`Bearer ${access_token}`
            }
        }
    )

    if(res.status==200) return res.data
}

export const getListSchedule = async (id:string) =>{
    const access_token = localStorage.getItem("token")
    const res = await axios.get(`${import.meta.env.VITE_BE_URL}/devices/${id}/schedule`,
        {
            headers:{
                Authorization:`Bearer ${access_token}`
            }
        }
    )

    if(res.status==200) return res.data
}

export const turnSchedule = async (deviceId:string, scheduleId:string, status: boolean) =>{
    const access_token = localStorage.getItem("token")
    const res = await axios.post(`${import.meta.env.VITE_BE_URL}/devices/${deviceId}/schedule/${scheduleId}/trigger`,
        {status}
        ,
        {
            headers:{
                Authorization:`Bearer ${access_token}`
            }
        }
    )

    if(res.status==200) return res.data
}

export const deleteSchedule = async (deviceId:string, scheduleId:string) =>{
    const access_token = localStorage.getItem("token")
    const res = await axios.delete(`${import.meta.env.VITE_BE_URL}/devices/${deviceId}/schedule/${scheduleId}`,
        {
            headers:{
                Authorization:`Bearer ${access_token}`
            }
        }
    )

    if(res.status==200) return res.data
}