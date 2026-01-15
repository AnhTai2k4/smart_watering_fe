import axios from "axios"
import axiosJWT from "../AxiosClient/AxiosClient.tsx";

export const createGroup = async (name:string, devices:string[])=>{
    const access_token = localStorage.getItem("token")
    const res = await axiosJWT.post(`${import.meta.env.VITE_BE_URL}/groups`,
        {
            name:name,
            devices:devices
        },
        {
            headers:{
                Authorization:`Bearer ${access_token}`
            }
        }
    )
    return res.data
}

export const getAllGroup = async ()=>{
    const access_token = localStorage.getItem("token")
    const res = await axiosJWT.get(`${import.meta.env.VITE_BE_URL}/groups`,
        {
            headers:{
                Authorization:`Bearer ${access_token}`
            }
        }
    )
    return res.data
}

export const getGroupById = async (id:string)=>{
    const access_token = localStorage.getItem("token")
    const res = await axiosJWT.get(`${import.meta.env.VITE_BE_URL}/groups/${id}`,
        {
            headers:{
                Authorization:`Bearer ${access_token}`
            }
        }
    )
    return res.data
}

export const deleteGroup = async (id:string)=>{
    const access_token = localStorage.getItem("token")
    const res = await axiosJWT.delete(`${import.meta.env.VITE_BE_URL}/groups/${id}`,
        {
            headers:{
                Authorization:`Bearer ${access_token}`
            }
        }
    )
    return res.data
}

export const updateGroup = async (id:string, name:string, devices:string[])=>{
    const access_token = localStorage.getItem("token")
    const res = await axiosJWT.put(`${import.meta.env.VITE_BE_URL}/groups/${id}`,
        {
            name:name,
            devices:devices
        },
        {
            headers:{
                Authorization:`Bearer ${access_token}`
            }
        }
    )
    return res.data
}


export const pumpGroup = async (id:string, action:string, duration:number)=>{
    const access_token = localStorage.getItem("token")
    const res = await axiosJWT.post(`${import.meta.env.VITE_BE_URL}/groups/${id}/watering`,
        {
            action:action,
            duration:duration
        },
        {
            headers:{
                Authorization:`Bearer ${access_token}`
            }
        }
    )
    return res.data
}

export const getHistoryPumpGroup = async (id:string)=>{
    const access_token = localStorage.getItem("token")
    const res = await axiosJWT.get(`${import.meta.env.VITE_BE_URL}/groups/${id}/watering/history`,
        {
            headers:{
                Authorization:`Bearer ${access_token}`
            }
        }
    )
    return res.data
}

export const createScheduleGroup = async (id:string, startTime:string, duration:number, repeatType:string, daysOfWeek:string[])=>{
    const access_token = localStorage.getItem("token")
    const res = await axiosJWT.post(`${import.meta.env.VITE_BE_URL}/groups/${id}/schedule`,
        {
            startTime:startTime,
            duration:duration,
            repeatType:repeatType,
            daysOfWeek:daysOfWeek
        },
        {
            headers:{
                Authorization:`Bearer ${access_token}`
            }
        }
    )

    return res.data
}

export const getListScheduleGroup = async (id:string)=>{
    const access_token = localStorage.getItem("token")
    const res = await axiosJWT.get(`${import.meta.env.VITE_BE_URL}/groups/${id}/schedule`,
        {
            headers:{
                Authorization:`Bearer ${access_token}`
            }
        }
    )
    return res.data
}

export const deleteScheduleGroup = async (groupId:string, scheduleId:string)=>{
    const access_token = localStorage.getItem("token")
    const res = await axiosJWT.delete(`${import.meta.env.VITE_BE_URL}/groups/${groupId}/schedule/${scheduleId}`,
        {
            headers:{
                Authorization:`Bearer ${access_token}`
            }
        }
    )
    return res.data
}

export const triggerScheduleGroup = async (groupId:string, scheduleId:string,status: boolean)=>{
    const access_token = localStorage.getItem("token")
    const res = await axiosJWT.post(`${import.meta.env.VITE_BE_URL}/groups/${groupId}/schedule/${scheduleId}/trigger`,
        {
            status
        }
        ,
        {
            headers:{
                Authorization:`Bearer ${access_token}`
            }
        }
    )
    return res.data
}

