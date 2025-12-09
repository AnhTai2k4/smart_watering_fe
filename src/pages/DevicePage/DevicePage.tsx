import Device_card from "../../components/Device_card/Device_card";
import CreateDevice from "../../components/CreateDevice/CreateDevice";
import "./DevicePage.css";
import { useDeviceContext } from "../../contexts/DeviceContext/DeviceContext";
import { getAllDevice } from "../../services/DeviceService/DeviceService";
import { useEffect, useState } from "react";


const DevicePage = () => {

  const { devices, setDevices } = useDeviceContext()
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [fieldSort, setFieldSort] = useState<string>('Sắp xếp')
  const [loading, setLoading] = useState<boolean>(true);

  console.log("devices: ", devices)

  useEffect(() => {
    const fetchDevice = async () => {
      setLoading(true);
      try {
        const result = await getAllDevice();
        setDevices(result.data)
      } catch (error) {
        console.error("Lỗi khi lấy danh sách thiết bị:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDevice()
  }, [])

  const handleGetDevcice  = async (field:string)=>{
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const apiUrl = `${import.meta.env.VITE_BE_URL}/devices?page=0&size=5&sort=${field}`;
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("all device", data);
      setDevices(data.data || []);
    } catch (error) {
      console.error("Loi khi fetch device:", error);
    } finally {
      setLoading(false);
    }

  }

  // --- Bắt đầu: THÊM HÀM CHUẨN HÓA CHUỖI ---
  const removeDiacritics = (str: string): string => {
    return str
      .normalize("NFD") // Chia chuỗi thành ký tự cơ bản và dấu riêng biệt
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các ký tự dấu (diacritics)
      .replace(/đ/g, "d").replace(/Đ/g, "D"); // Xử lý riêng cho 'đ'
  };
  // --- Kết thúc: THÊM HÀM CHUẨN HÓA CHUỖI ---

  // ... useEffect giữ nguyên

  // ----------------------------------------------------
  // Logic lọc danh sách ĐÃ SỬA
  const normalizedSearchTerm = removeDiacritics(searchTerm.toLowerCase());

  const filteredDevices = devices.filter(device => {
    // 1. Chuẩn hóa tên thiết bị
    const normalizedDeviceName = removeDiacritics(device.name.toLowerCase());

    // 2. So sánh chuỗi đã được chuẩn hóa
    return normalizedDeviceName.includes(normalizedSearchTerm);
  });
  // ----------------------------------------------------


  return (
    <div className="device-page">
      <div className="device-page__inner">
        <header className="device-page__header">
          <div>
            <h1 className="device-page__title">Tất cả thiết bị</h1>
            <p className="device-page__subtitle">
              Chọn một trong các thiết bị dưới đây để xem chi tiết và điều khiển.
            </p>
          </div>
        </header>

        <div className="device-page__toolbar">
          <div className="device-search">
            <span className="device-search__icon">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#78A75A"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm thiết bị..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="device-search__input"
            />
          </div>

          <div className="dropdown">
            <button className=" dropdown-toggle device-sort-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <span className="device-sort-btn__icon">↕</span>
              <span>{fieldSort}</span>
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#" onClick={()=>{handleGetDevcice(""); setFieldSort("Mặc định")}}>Mặc định</a></li>
              <li><a className="dropdown-item" href="#" onClick={()=>{handleGetDevcice("name"); setFieldSort("Theo tên")}}>Theo tên</a></li>
              <li><a className="dropdown-item" href="#" onClick={()=>{handleGetDevcice("updatedAt"); setFieldSort("Ngày cập nhật")}}>Ngày cập nhật</a></li>
              <li><a className="dropdown-item" href="#" onClick={()=>{handleGetDevcice("online"); setFieldSort("Đang online")}}>Đang online</a></li>
            </ul>
          </div>
        </div>

        <div className="device__section">
          <div className="device__container">
            {loading ? (
              <div className="loading-message">Đang lấy danh sách thiết bị...</div>
            ) : filteredDevices.length === 0 ? (
              <div className="empty-message">Không có thiết bị</div>
            ) : (
              filteredDevices.map((device, id) => {
                return (<Device_card key={id} deviceName={device.name} id={device.id} />)
              })
            )}
          </div>

          <div className="dropup-center dropup dropup__container">
            <button
              className="btn btn-secondary dropdown-toggle btn__container"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="./add_button.png"
                alt="add_button"
                className="add__icon"
              />
              <h3>Thêm</h3>
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  href=""
                  data-bs-toggle="modal"
                  data-bs-target="#deviceModal"
                >
                  Thêm thiết bị
                </a>
              </li>
              <hr />
              <li>
                <a className="dropdown-item" href="#">
                  Thêm nhóm
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ------------------Modal ---------------------*/}
        <CreateDevice />
      </div>
    </div>
  );
};

export default DevicePage;
