import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { isJsonString } from "./utils.tsx";

interface JwtPayload {
  exp: number;
  iat?: number;
  userId?: string;
  role?: string;
}



const axiosJWT = axios.create({
    withCredentials: true, // cần cho refresh cookie
  });



const handleDecode = (): {
    storageData: string | null;
    decoded: JwtPayload | null;
  } => {
    let storageData = localStorage.getItem("token");
  
    if (!storageData) {
      return { storageData: null, decoded: null };
    }
  
    if (isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
    }
  
    try {
      const decoded = jwtDecode<JwtPayload>(storageData as string);
      return { storageData, decoded };
    } catch (err) {
      console.error("Decode token failed", err);
      return { storageData: null, decoded: null };
    }
  };
  

axiosJWT.interceptors.request.use(async (config) => {
    // bỏ qua refresh
    if (config.url?.includes("/auth/refresh")) {
      return config;
    }
  
    const currentTime = Math.floor(Date.now() / 1000);
    const { storageData, decoded } = handleDecode();
  
    let accessToken = storageData;
  
    if (decoded && decoded.exp < currentTime) {
      console.log("accessToken hết hạn, refresh token")
      const res = await axios.post(
        `${import.meta.env.VITE_BE_URL}/auth/refresh`,
        null, // không gửi body
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      accessToken = res.data.accessToken;
      console.log("accessToken mới: ", accessToken)
      localStorage.setItem("token", JSON.stringify(accessToken));
    }
  
    if (accessToken) {
      console.log("token còn hạn")
      console.log("accessToken: ", accessToken)

      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  
    return config;
  });

  export default axiosJWT;