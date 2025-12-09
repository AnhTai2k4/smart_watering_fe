import React from "react"
import { useNavigate } from "react-router-dom"
import "./ConfigPage.css"

const ConfigPage = () => {
  const navigate = useNavigate()
  const userName = localStorage.getItem("username") || "phanvuong"
  const email = localStorage.getItem("email") || "phanvuong118@gmail.com"

  return (
    <div className="account-page">
      <div className="account-card">
        <div className="account-header">
          <div className="account-avatar">
            <span>{userName.charAt(0).toUpperCase()}</span>
          </div>
          <div className="account-info">
            <h2>{userName}</h2>
            <p>{email}</p>
          </div>
        </div>

        <div className="account-menu">
          <button 
            className="account-menu__item"
            onClick={() => navigate("/change_password_page")}
          >
            <span>Đổi mật khẩu</span>
          </button>
          <button 
            className="account-menu__item"
            onClick={() => navigate("/email_verification_page")}
          >
            <span>Xác thực email</span>
          </button>
          <button className="account-menu__item">
            <span>Thông tin ứng dụng</span>
          </button>
        </div>

        <button
          className="account-logout"
          onClick={() => {
            localStorage.removeItem("token")
            localStorage.removeItem("email")
            localStorage.removeItem("username")
            localStorage.removeItem("verified")

            window.location.href = "/"
          }}
        >
          Đăng xuất
        </button>

        <p className="account-version">Phiên bản 1.0.0</p>
      </div>
    </div>
  )
}

export default ConfigPage
