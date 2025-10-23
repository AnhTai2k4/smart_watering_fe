// src/contexts/DeviceContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface Device {
  deviceId: string;
  name: string;
  topicSensor: string;
  topicWatering: string;
}

interface DeviceContextType {
  devices: Device[];
  addDevice: (device: Device) => void;
  removeDevice: (id: string) => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const [devices, setDevices] = useState<Device[]>(() => {
    // ✅ Lấy từ localStorage khi load trang
    const stored = localStorage.getItem("devices");
    return stored ? JSON.parse(stored) : [];
  });

  // ✅ Mỗi khi devices thay đổi, lưu lại vào localStorage
  useEffect(() => {
    localStorage.setItem("devices", JSON.stringify(devices));
  }, [devices]);

  const addDevice = (device: Device) => {
    setDevices((prev) => [...prev, device]);
  };

  const removeDevice = (deviceId: string) => {
    setDevices((prev) => prev.filter((device) => device.deviceId !== deviceId));
  };

  return (
    <DeviceContext.Provider value={{ devices, addDevice, removeDevice }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
};
