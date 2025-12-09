import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";


function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('username')
  const currentPath = location.pathname;

  return (
    <header className="header">
      <div className="logo_group">
        <img src="/Tree.png" alt="Tree" className="picture" onClick={() => { navigate("/home_page") }} />
        <h1 className="logo" onClick={() => { navigate("/home_page") }}>Smart Watering</h1>
      </div>

      <nav className="header-nav-center">
        <button
          className={`header-nav-item ${currentPath === "/home_page" ? "header-nav-item--active" : ""}`}
          onClick={() => navigate("/home_page")}
          title="Trang chủ"
          aria-label="Trang chủ"
        >
          <span className="header-nav-item__icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M160-160v-375l-72 55-47-63 439-337 440 336-48 64-392-300-240 184v356h160v80H160Zm540 95q-42 29-92.5 24.5T521-81q-36-36-40.5-86.5T505-260q-29-42-24.5-92.5T521-439q36-36 86.5-40.5T700-455q42-29 92.5-24.5T879-439q36 36 40.5 86.5T895-260q29 42 24.5 92.5T879-81q-36 36-86.5 40.5T700-65Zm0-98 46 32q18 13 39 11t37-18q16-16 18-37t-11-39l-32-46 32-46q13-18 11-39t-18-37q-16-16-37-18t-39 11l-46 32-46-32q-18-13-39-11t-37 18q-16 16-18 37t11 39l32 46-32 46q-13 18-11 39t18 37q16 16 37 18t39-11l46-32Zm0-47q21 0 35.5-14.5T750-260q0-21-14.5-35.5T700-310q-21 0-35.5 14.5T650-260q0 21 14.5 35.5T700-210ZM480-470Zm220 210Z" /></svg>

          </span>
        </button>
        <button
          className={`header-nav-item ${currentPath === "/device_page" ? "header-nav-item--active" : ""}`}
          onClick={() => navigate("/device_page")}
          title="Thiết bị"
          aria-label="Thiết bị"
        >
          <span className="header-nav-item__icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M480-120q-88 0-168.5-33T169-249l57-57q51 51 117 78.5T481-200q72 0 137.5-27T735-305l56 56q-63 63-143 96t-168 33Zm0-160q-56 0-107-21t-91-61l56-56q29 29 65.5 43.5T480-360q40 0 76.5-14.5T622-418l56 56q-40 40-91 61t-107 21ZM200-760v40h560v-40H200Zm124 120 12 40h288l12-40H324Zm12 120q-26 0-47-15.5T260-576l-20-64h-40q-33 0-56.5-23.5T120-720v-120h720v120q0 33-23.5 56.5T760-640h-40l-26 68q-9 23-29 37.5T620-520H336ZM200-760v40-40Z" /></svg>
          </span>
        </button>
        <button
          className={`header-nav-item ${currentPath === "/group_page" ? "header-nav-item--active" : ""}`}
          onClick={() => navigate("/group_page")}
          title="Nhóm thiết bị"
          aria-label="Nhóm thiết bị"
        >
          <span className="header-nav-item__icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-320H520v-160H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z" /></svg>
          </span>
        </button>

      </nav>

      <nav className="notiandvery">
        {username ?

          <img
            src="/chicken.png"
            alt="Tài khoản"
            className="header__user-icon"
            onClick={() => navigate("/config_page")}
          /> :
          <p style={{color:"#3a6f2a", fontSize:"20px"}}>
            <a href="/login_page">Đăng nhập</a> / <a href="/signup_page">Đăng ký</a>
          </p>}
      </nav>
    </header>
  );
}

export default Header;
