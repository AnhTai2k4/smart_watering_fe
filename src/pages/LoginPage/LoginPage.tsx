import "./LoginPage.css";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { useContext, useState } from "react";
import { login } from "../../services/UserService/UserService";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const {userName, setUserName, password, setPassword} = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const res = await login(userName as string, password as string);
    
    console.log(res);
    
    localStorage.setItem("token",res.data.accessToken)
    localStorage.setItem("username", userName)
    
    console.log("token", localStorage.getItem("token"))

    if(res!== null) navigate("/home_page");
    else alert("Đăng nhập thất bại");
  
  }
  
  return (
    <div className="login__section">
      <div className="login__container">
        <div className="login__logo">
          <img src="./Tree.png" alt="anh ne" className="login__img" />
          <h1>Smart Watering</h1>
        </div>
        <div className="login__form">
          <h2 className="h2__title">Đăng nhập</h2>

          <label htmlFor="" className="lable">
            Tên đăng nhập
          </label>
          <input
            type="text"
            className="input__login"
            placeholder="Nhập tên đăng nhập"
            onChange={(e) => setUserName(e.target.value)}
          />

          <label htmlFor="" className="lable">
            Mật khẩu
          </label>
          <div className="password__wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className="input__login"
              placeholder="Nhập mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span 
              className="password__toggle" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>
          <a href="/forget_page">Quên mật khẩu</a>

          <button className="btn__login" onClick={handleSubmit}>Đăng nhập</button>
          <p>
            Bạn mới biết đến SmartSprout? <a href="/signup_page">Đăng ký</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
