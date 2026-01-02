import { useNavigate } from "react-router-dom";
import { useDeviceContext } from "../../contexts/DeviceContext/DeviceContext";
import {
  deleteDevice,
  getDeviceById,
} from "../../services/DeviceService/DeviceService";
import "./Device_card.css";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

interface deviceCardProps {
  deviceName: String;
  id: String;
}

const Device_card = ({ deviceName, id }: deviceCardProps) => {
  const navigate = useNavigate();

  // Realtime states
  const [topicSensor, setTopicSensor] = useState("");
  const [topicWatering, setTopicWatering] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [isWatering, setIsWatering] = useState(false);

  const [sensorData, setSensorData] = useState({
    deviceId: "",
    temp: "",
    air: "",
    soil: "",
    timestamp: "",
  });

  const { removeDevice } = useDeviceContext();

  useEffect(() => {
    const getDevive = async () => {
      const device = await getDeviceById(id);
      console.log("Device info:", device);
      setIsOnline(device.data.online);
    };
    getDevive();
  }, []);

  useEffect(() => {
    console.log("Device Status", isOnline);
    console.log("Watering Status", isWatering);
  }, [isWatering, isOnline]);

  const handleDelete = async () => {
    const res = await deleteDevice(id);
    if (res) console.log("Xóa thành công thiết bị", id);
    removeDevice(id);
  };

  const handleNavigate = () => {
    navigate(`/data_device_page?id=${id}&device-name=${deviceName}`);
  };

  // Lấy thông tin device từ API
  useEffect(() => {
    if (!id) return;

    const fetchDevice = async () => {
      const result = await getDeviceById(id);
      setTopicSensor(result.data.topicSensor);
      setTopicWatering(result.data.topicWatering);
      setDeviceId(result.data.deviceId);
    };

    fetchDevice();
  }, [id]);

  // WebSocket realtime STOMP + SockJS
  useEffect(() => {
    if (!topicSensor || !topicWatering) return;

    const token = localStorage.getItem("token");

    const client = new Client({
      webSocketFactory: () =>
        new SockJS(`${import.meta.env.VITE_BE_URL}/streaming`),

      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      reconnectDelay: 5000,
      debug: (msg) => console.log(msg),
    });

    client.onConnect = () => {
      console.log("Connected to WS");

      // Online/offline
      client.subscribe(`/user/device/status/${deviceId}`, (msg) => {
        const data = JSON.parse(msg.body);

        setIsOnline(data.isOnline);
      });

      // Watering state
      client.subscribe(`/user/device/${topicWatering}`, (msg) => {
        const data = JSON.parse(msg.body);
        setIsWatering(data.isWatering);
      });

      // Sensor realtime data
      client.subscribe(`/user/device/${topicSensor}`, (msg) => {
        const data = JSON.parse(msg.body);
        setSensorData(data);
      });
    };

    client.activate();
  }, [topicSensor, topicWatering, deviceId]);

  return (
    <div
      className="device__card"
      onClick={handleNavigate}
      style={{
        background: isWatering
          ? "#93caf5ff" // đang tưới
          : "#abfe8fff", // mặc định
      }}
    >
      {/* DELETE ICON */}
      <div
        className="trash_icon"
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
      >
        <img src="./Trash.png" alt="Xóa" />
      </div>

      {/* STATUS BAR */}
      <div className="device__status">
        <img
          src={isOnline ? "./wifi_on.png" : "./wifi-off.png"}
          className="wifi_icon"
          alt="wifi"
        />

        {isWatering && (
          <div className="watering_status">
            {/* <img src="./water_icon.png" /> */}
            <span>Đang tưới</span>
          </div>
        )}
      </div>

      {/* TREE ICON */}
      <div className="tree_icon">
        <img src="./tree.png" alt="tree" />
      </div>

      {/* SENSOR VALUES */}
      {isWatering ? (
        <div className="sensor_box" style={{ color: "#6593f8" }}>
          <div className="sensor_row">
            <span>Nhiệt độ</span>
            <span className="sensor_value">
              {sensorData.temp ? `${sensorData.temp}°C` : "--"}
            </span>
          </div>

          <div className="sensor_row">
            <span>Độ ẩm KK</span>
            <span className="sensor_value">
              {sensorData.air ? `${sensorData.air}%` : "--"}
            </span>
          </div>

          <div className="sensor_row">
            <span>Độ ẩm đất</span>
            <span className="sensor_value">
              {sensorData.soil ? `${sensorData.soil}%` : "--"}
            </span>
          </div>
        </div>
      ) : (
        <div className="sensor_box" style={{ color: "#14532d" }}>
          <div className="sensor_row">
            <span>Nhiệt độ</span>
            <span className="sensor_value">
              {sensorData.temp ? `${sensorData.temp}°C` : "--"}
            </span>
          </div>

          <div className="sensor_row">
            <span>Độ ẩm KK</span>
            <span className="sensor_value">
              {sensorData.air ? `${sensorData.air}%` : "--"}
            </span>
          </div>

          <div className="sensor_row">
            <span>Độ ẩm đất</span>
            <span className="sensor_value">
              {sensorData.soil ? `${sensorData.soil}%` : "--"}
            </span>
          </div>
        </div>
      )}

      {/* DEVICE NAME */}
      <div className="device_name">
        {isWatering ? (
          <h3 style={{ color: "#6593f8" }}>{deviceName}</h3>
        ) : (
          <h3>{deviceName}</h3>
        )}
        <p style={{ margin: 0, color: "#131414ff", opacity: 0.8 }}>
          {deviceId}
        </p>
      </div>
    </div>
  );
};

export default Device_card;
