// src/contexts/DeviceContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";


interface Device {
  id:String;
  deviceId: String;
  name: String;
  topicSensor: String;
  topicWatering: String;
  createdAt: String;
  updatedAt: String;
}

interface DeviceContextType {
  devices: Device[];
  setDevices: (device:Device[]) => void,
  addDevice: (device: Device) => void;
  removeDevice: (id: String) => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const [devices, setDevices] = useState<Device[]>([]);


  const addDevice = (device: Device) => {
    setDevices((prev) => [...prev, device]);
  };

  const removeDevice = (id: String) => {
    setDevices((prev) => prev.filter((device) => device.id !== id));
  };

  return (
    <DeviceContext.Provider value={{ devices, setDevices, addDevice, removeDevice }}>
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
