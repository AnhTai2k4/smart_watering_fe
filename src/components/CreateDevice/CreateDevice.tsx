import "./CreateDevice.css";
import { useDeviceContext } from "../../contexts/DeviceContext/DeviceContext";
import { useEffect, useState } from "react";
import { createDevice } from "../../services/DeviceService/DeviceService";
import { useNavigate } from "react-router-dom";

const CreateDevice = () => {
  const [deviceName, setDeviceName] = useState<string>("");
  const [deviceId, setDeviceId] = useState<string>("");
  const { devices, addDevice } = useDeviceContext();
  const navigate = useNavigate();

  const handleCreateDevice = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault(); // 🛑 Chặn form reload

    try {
      const newDevice = await createDevice(deviceId, deviceName);
      addDevice(newDevice.data);
      
      
    } catch (err) {
      console.error("Lỗi API:", err);
    }
  };

  useEffect(() => {
    console.log("devices sau khi add new device", devices);
  }, [devices]);

  return (
    <div className="create-device-page">
      <div className="form-container">
        <h2>Thêm thiết bị</h2>

        <form>
          <div className="mb-3">
            <label>ID Thiết bị:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setDeviceId(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Tên thiết bị:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setDeviceName(e.target.value)}
            />
          </div>

          <button
            type="button" 
            className="btn btn-primary"
            onClick={handleCreateDevice}
          >
            Thêm
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDevice;
