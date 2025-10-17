import { useNavigate } from "react-router-dom";
import "./Header.css";


function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="logo_group">
        <img src="/Tree.png" alt="Tree" className="picture" onClick={()=>{navigate("/device_page")}}/>
        <h1 className="logo" onClick={()=>{navigate("/device_page")}}>Smart Watering</h1>
      </div>

      <div className="navigate__container">
        <a href="./device_page">Tất cả thiết bị</a>
        <a href="./group_page">Nhóm thiết bị</a>
      </div>

      <nav className="notiandvery">
        <img src="/Bell.png" />
        <img src="/User.png" />
      </nav>
    </header>
  );
}

export default Header;
