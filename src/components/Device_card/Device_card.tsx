import { useNavigate } from "react-router-dom";
import { useDeviceContext } from "../../contexts/DeviceContext/DeviceContext";
import { deleteDevice, getDeviceById } from "../../services/DeviceService/DeviceService";
import "./Device_card.css";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

interface deviceCardProps {
    deviceName: string;
    id: string;
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
                    ? "linear-gradient(135deg, #7EC8FF 0%, #54A8F5 100%)" // đang tưới
                    : "linear-gradient(135deg, #98D8AA 0%, #7bc98a 100%)", // mặc định
            }}
        >
            {/* DELETE ICON */}
            <div className="trash_icon" onClick={(e) => { e.stopPropagation(); handleDelete(); }}>
                <img src="./Trash.png" alt="Xóa" />
            </div>

            {/* STATUS BAR */}
            <div className="device__status">
                <img
                    src={isOnline ? "./wifi-on.png" : "./wifi-off.png"}
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
                <img src="./Tree_white.png" alt="tree" />
            </div>

            {/* SENSOR VALUES */}
            <div className="sensor_box">
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

            {/* DEVICE NAME */}
            <div className="device_name">
                <h3>{deviceName}</h3>
                <p style={{ margin: 0, color: "#fff", opacity: 0.8 }}>{deviceId}</p>
            </div>
        </div>
    );
};

export default Device_card;
