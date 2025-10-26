import { useNavigate, useParams } from "react-router-dom";
import "./DataDevicePage.css";
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DataDevicePage = () => {
  const [water, setWater] = useState(0);
  const navigate = useNavigate();
  const id = useParams();

  const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];

  console.log(id);
  const handleBack = () => {
    navigate("/device_page");
  };
  return (
    <div className="data__section">
      <div className="back__container">
        <img src="/arrow_back.png" alt="" onClick={handleBack} />
        <h3>
          Thiết bị: <span>Ban công</span>
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
                min={0}
                max={1000}
                value={water}
                onChange={(e) => {
                  setWater(Number(e.target.value));
                  e.target.style.background = `linear-gradient(to right, #348E2B ${
                    (water / 1000) * 100
                  }%, #d3d3d3 ${(water / 1000) * 100}%)`;
                }}
              />
              <h3>{water}ml</h3>
              <div className="pump__button">
                <button>Bơm ngay</button>
                <button>Lên lịch</button>
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
                  <th>Lượng nước</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1</td>
                  <td>2</td>
                </tr>

                <tr>
                  <td>3</td>
                  <td>4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/*-----------------Dữ liệu của nhiệt độ, độ ẩm từ sensor------------*/}
        <div className="data__container">
          <div id="temp" className="data__box">
            <div className="label">
              <div className="label-left">
                <img src="/temp.png" alt="logo nhiet do" />
                <h3>Nhiệt độ</h3>
              </div>
              <div className="label-right">
                <h3>27.5 ℃</h3>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <LineChart
                width={500}
                height={400}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <legend />
                <Line type="monotone" dataKey="uv" stroke="#f27474ff" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div id="temp" className="data__box">
            <div className="label">
              <div className="label-left">
                <img src="/humid.png" alt="logo nhiet do" />
                <h3>Độ ẩm</h3>
              </div>
              <div className="label-right">
                <h3>27.5 ℃</h3>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <LineChart
                width={500}
                height={400}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <legend />
                <Line type="monotone" dataKey="uv" stroke="#7aa9f0ff" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDevicePage;
