import Device_card from "../../components/Device_card/Device_card";
import CreateDevice from "../../components/CreateDevice/CreateDevice";
import "./DevicePage.css";
import { useDeviceContext } from "../../contexts/DeviceContext/DeviceContext";
import { getAllDevice } from "../../services/DeviceService/DeviceService";
import { useEffect, useState } from "react";


const DevicePage = () => {

  const { devices, setDevices } = useDeviceContext()
  const [searchTerm, setSearchTerm] = useState<string>(''); // <--- Thêm state này

  console.log("devices: ", devices)

  useEffect(() => {
    const fetchDevice = async () => {
      const result = await getAllDevice();
      setDevices(result.data)
    }
    fetchDevice()
  }, [])

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
    <div className="device__page">
      <div className="navigator">
        <a href="./device_page">Tất cả thiết bị</a>
        <a href="./group_page">Nhóm thiết bị</a>
      </div>
      <p>Chọn một trong các thiết bị sau:</p>

      {/* Thêm Thanh Tìm Kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm thiết bị..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="device-search-input" // Thêm class CSS nếu cần
      />
      {/* Kết thúc Thanh Tìm Kiếm */}
      <div className="device__section">
        <h2>Xin chào, Anh Tài!</h2>
        <p>Chọn một trong các thiết bị sau:</p>
        <div className="device__container">
          {
            filteredDevices.map((device, id) => {
              // console.log(id, "  device name: " , device.name)
              return (<Device_card key={id} deviceName={device.name} id={device.id} />)
            })
          }
          {/* Chỗ này sau sẽ có API fetch dữ liệu từ BE về */}
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
  );
};

export default DevicePage;
