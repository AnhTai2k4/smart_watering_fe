import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./DataDevicePage.css";
import { useEffect, useState } from "react";
import ChartData from "../../components/ChartData/ChartData";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getDeviceById, getHistorySensorData, pumpWater, getHistoryWateringData } from "../../services/DeviceService/DeviceService";

const DataDevicePage = () => {
  const [water, setWater] = useState(0); //water ở đây là thời lượng bơm nước nhé
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  console.log("Device ID from URL:", id);
  const deviceName = searchParams.get("device-name") || "";
  const [sensorData, setSensorData] = useState({ "deviceId": "", temp: "", air: "", soil: "", "timestamp": "" });
  const [topicSensor, setTopicSensor] = useState("")
  const [topicWatering, setTopicWatering] = useState("")
  const [isWatering, setIsWatering] = useState(false)
  const [historyWateringData, setHistoryWateringData] = useState([])

  const [historySensorData, setHistorySensorData] = useState([])

  const MIN_DURATION = 0;
  const MAX_DURATION = 500;

  const progressPercent = ((water - MIN_DURATION) / (MAX_DURATION - MIN_DURATION)) * 100;

  //Start/stop pump water
  const handlePump = async (action: String) => {
    // Gửi lệnh bơm nước tới server qua WebSocket hoặc API
    console.log(`🚰 Pumping ${water} s`);
    const result = await pumpWater(id, water, action);
    if (result) setIsWatering(action === "START" ? true : false);
    console.log("Pump water result:", result);
  }

  //Lấy history watering data
  useEffect(() => {
    const fetchHistoryWateringData = async () => {
      if (!id) return;
      const result = await getHistoryWateringData(id);
      setHistoryWateringData(result.data);
      console.log("History watering data:", result.data);
    }
    fetchHistoryWateringData();

  }, [isWatering])

  //Lấy thông tin device để lấy topicSensor
  useEffect(() => {
    if (!id) return; // đảm bảo có id trước khi gọi
    const getDevice = async (deviceId: string) => {
      const result = await getDeviceById(deviceId);
      console.log("Device info:", result);
      setTopicSensor(result.data.topicSensor);
      setTopicWatering(result.data.topicWatering);
      console.log(topicSensor);
    };

    getDevice(id);
  }, []);

  // WebSocket connection using STOMP over SockJS
  useEffect(() => {
    const token = localStorage.getItem("token"); // JWT token

    const client = new Client({
      // DÙNG SOCKJS THAY brokerURL
      webSocketFactory: () =>
        new SockJS(
          `${import.meta.env.VITE_BE_URL}/streaming`
        ),

      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000, // Tự động reconnect mỗi 5s
      debug: (str) => console.log(str),
    });

    client.onConnect = () => {
      console.log("✅ Connected to WebSocket via SockJS");

      // Lắng nghe dữ liệu cảm biến
      client.subscribe("/user/devices/sensor", (message) => {
        const data = JSON.parse(message.body);
        console.log("📡 Sensor data:", data);
        setSensorData(data)
      });

      // Lắng nghe trạng thái online/offline
      client.subscribe("/user/devices/status", (message) => {
        const data = JSON.parse(message.body);
        console.log("🟢 Device status:", data);
      });

      // Lắng nghe trạng thái máy bơm
      client.subscribe(`/user/device/${topicWatering}`, (message) => {
        const data = JSON.parse(message.body);
        console.log("💧 Watering:", data);
        if (data.isWatering) setIsWatering(true);
        else setIsWatering(false);
      });

      // Lắng nghe dữ liệu cảm biến
      client.subscribe(`/user/device/${topicSensor}`, (message) => {
        const data = JSON.parse(message.body);
        setSensorData(data)
        console.log("📡 Sensor data:", data);
      });
    };

    client.onStompError = (frame) => {
      console.error("❌ STOMP error:", frame.headers["message"]);
      console.error("Details:", frame.body);
    };

    client.activate();
  }, [topicSensor]);

  //Lấy history sensor data
  useEffect(() => {
    const fetchHistorySensorData = async () => {
      if (!id) return;
      const result = await getHistorySensorData(id);
      setHistorySensorData(result.data);
      console.log("History sensor data:", result.data);

    }

    fetchHistorySensorData();
  }, [sensorData]);

  const handleBack = () => {
    navigate("/device_page");
  };
  return (
    <div className="data__section">
      <div className="back__container">
        <img src="/arrow_back.png" alt="" onClick={handleBack} />
        <h3>
          Thiết bị: <span>{deviceName}</span>
        </h3>
      </div>
      <div className="device__container">
        {/*----------------Bơm + Lên lịch + hiển thị lịch sử bơm-------------------*/}
        <div className="action__container">
          {/*----------------Bơm + Lên lịch -------------------*/}
          <div className="action__box">
            <img src="/may_bom.png" alt="May bom" />
            <div className="pump__section">
              <input
                type="range"
                value={water}
                onChange={(e) => {
                  setWater(Number(e.target.value));
                }}
                className="water-slider"
                // *** Thêm style động để cập nhật biến CSS ***
                style={
                  {
                    "--slider-progress": `${progressPercent}%`,
                  } as React.CSSProperties
                }
              />
              <h3>{water}s</h3>
              <div className="pump__button">
                {/*----------------Nút bơm nước và dừng bơm-------------------*/}
                {isWatering ?
                  <button style={{ backgroundColor: "red" }} onClick={() => handlePump("STOP")}>Dừng bơm</button>
                  :

                  <button onClick={() => handlePump("START")}>Bơm ngay </button>
                }
                <button onClick={() => navigate(`/schedule_device_page?id=${id}&device-name=${deviceName}`)}>Lên lịch</button>
              </div>
            </div>
          </div>

          <hr />

          {/*----------------Hiển thị lịch sử bơm-------------------*/}
          <div className="schedule__box">
            <h3>Lịch sử bơm</h3>

            <table className="my-table">
              <thead>
                <tr>
                  <th>Thời điểm</th>
                  <th>Thời gian bơm</th>
                  <th>Vị trí</th>
                </tr>
              </thead>

              <tbody>
                {historyWateringData.map((data: any, index) => {
                  return (
                    <tr key={index}>
                      <td>{new Date(data.startTime).toLocaleString()}</td>
                      <td>{data.duration} s</td>
                      <td>Thiết bị</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/*-----------------Dữ liệu của nhiệt độ, độ ẩm từ sensor------------*/}
        <div className="data__container">
          {/**---------Nhiệt độ------------- */}
          <div id="temp" className="data__box">
            <div className="label">
              <div className="label-left">
                <img src="/temp.png" alt="logo nhiet do" />
                <h3>Nhiệt độ</h3>
              </div>
              <div className="label-right">
                <h3>{sensorData.temp} ℃</h3>
              </div>
            </div>
            <ChartData datas={historySensorData} type="temp" />
          </div>

          {/**---------Độ ẩm không khí---------------- */}

          <div id="air" className="data__box">
            <div className="label">
              <div className="label-left">
                <img src="/humid.png" alt="logo nhiet do" />
                <h3>Độ ẩm không khí</h3>
              </div>
              <div className="label-right">
                <h3>{sensorData.air}%</h3>
              </div>
            </div>
            <ChartData datas={historySensorData} type="air" />
          </div>

          {/**------------Độ ẩm đất---------------------- */}
          <div id="soid" className="data__box">
            <div className="label">
              <div className="label-left">
                <img src="/humid.png" alt="logo nhiet do" />
                <h3>Độ ẩm đất</h3>
              </div>
              <div className="label-right">
                <h3>{sensorData.soil}%</h3>
              </div>
            </div>
            <ChartData datas={historySensorData} type="soil" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDevicePage;
