import { createContext, useState, type ReactNode } from "react";

interface Device {
  id: String;
  deviceId: String;
  name: String;
  topicSensor: String;
  topicWatering: String;
}

interface DeviceContextType {
  devices: Device[];
  addDevice: (device: Device) => void;
  removeDevice: (id: String) => void;
}

export const DeviceContext = createContext<DeviceContextType | undefined>(
  undefined
);

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const [devices, setDevices] = useState<Device[]>([]);

  const addDevice = (device: Device) => setDevices((prev) => [...prev, device]);

  const removeDevice = (deviceId: String) =>
    setDevices((prev) => prev.filter((device) => device.deviceId != deviceId));

  return (
    <DeviceContext.Provider value={{ devices, addDevice, removeDevice }}>
      {children}
    </DeviceContext.Provider>
  );
};
