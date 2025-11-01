import { useNavigate, useParams } from "react-router-dom";
import "./DataDevicePage.css";
import { useState } from "react";
import ChartData from "../../components/ChartData/ChartData";

const DataDevicePage = () => {
  const [water, setWater] = useState(0);
  const navigate = useNavigate();
  const id = useParams();

  const datas = [
    { time: "Page A", data: 4000 },
    { time: "Page B", data: 3000 },
    { time: "Page C", data: 2000 },
    { time: "Page D", data: 2780 },
    { time: "Page E", data: 1890 },
    { time: "Page F", data: 2390 },
    { time: "Page G", data: 3490 },
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
          {/**---------Nhiệt độ------------- */}
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
            <ChartData datas={datas} />
          </div>

          {/**---------Độ ẩm không khí---------------- */}

          <div id="temp" className="data__box">
            <div className="label">
              <div className="label-left">
                <img src="/humid.png" alt="logo nhiet do" />
                <h3>Độ ẩm không khí</h3>
              </div>
              <div className="label-right">
                <h3>27.5 ℃</h3>
              </div>
            </div>
            <ChartData datas={datas} />
          </div>

          {/**------------Độ ẩm đất---------------------- */}
          <div id="temp" className="data__box">
            <div className="label">
              <div className="label-left">
                <img src="/humid.png" alt="logo nhiet do" />
                <h3>Độ ẩm đất</h3>
              </div>
              <div className="label-right">
                <h3>27.5 ℃</h3>
              </div>
            </div>
            <ChartData datas={datas} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDevicePage;
