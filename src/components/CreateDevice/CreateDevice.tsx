import "./CreateDevice.css";
import { useDeviceContext } from "../../contexts/DeviceContext/DeviceContext";
import { useEffect, useState } from "react";
import { createDevice} from "../../services/DeviceService/DeviceService";

const CreateDevice = () => {
  const [deviceName, setDeviceName] = useState<string>("");
  const [deviceId, setDeviceId] = useState<String>("");
  const {devices, addDevice } = useDeviceContext();

  const handleCreateDevice = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const newDevice= await createDevice(deviceId, deviceName)
    addDevice(newDevice.data)
    
  };

  useEffect(()=>{console.log("devices sau khi add new device", devices)},[devices])
  


  return (
    <div
      className="modal fade"
      id="deviceModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Thêm thiết bị
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                  ID Thiết bị:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="device-id"
                  onChange={(e) => {
                    setDeviceId(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">
                  Tên thiết bị:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="device-name"
                  onChange={(e) => {
                    setDeviceName(e.target.value);
                  }}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Đóng
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e)=>handleCreateDevice(e)}
            >
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDevice;
