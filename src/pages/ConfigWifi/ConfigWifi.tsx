import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ConfigWifi.css";
import CreateDevice from "../../components/CreateDevice/CreateDevice";

const ConfigWifi = () => {
  const { status } = useParams<{ status: string }>();
  console.log("Status param:", status);
  const handleClick = () => {
    window.location.href = "http://192.168.4.1";
  };
  return (
    <>
      {status === "success" ? (
        <>
          <CreateDevice />
        </>
      ) : (
        <>
          <div className="wifi__section">
            <div className="wifi__container">
              <h2>Cấu hình thiết bị</h2>
              <p>Kết nối thiết bị tưới nước tự động của bạn đến mạng WiFi</p>
              <div className="notice__container">
                <p>Bước 1: Kết nối tới Wifi ESP_Config mà bạn muốn cấu hình</p>
                <p>Bước 2: Sau đó quay lại đây và bấm nút xác nhận bên dưới</p>
                <p>
                  <span style={{ color: "red" }}>Lưu ý</span>: Nếu bạn đang cấu
                  hình nhiều thiết bị tưới cây cùng lúc, hãy đảm bảo chỉ có 01
                  thiết bị được bật tại một thời điểm!
                </p>
              </div>

              <button className="connect__btn" onClick={() => handleClick()}>
                Tôi đã kết nối với ESP_Config
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ConfigWifi;
