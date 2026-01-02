import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { signup } from "../../services/UserService/UserService";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
const SignupPage = () => {
  const { userName, setUserName, password, setPassword } =
    useContext(UserContext);
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (password !== rePassword) {
      alert("Mật khẩu không khớp");
      return;
    }

    try {
      const res = await signup(userName as string, password as string, email as string);

      if (res.data.data !== null) navigate("/login_page");
    } catch {
      alert("Trung user");
    }
  };

  const handleReturnClick = () => {
    navigate("/login_page");
  };
  return (
    <div className="signup__section">
      <div className="signup__container">
        <div className="signup__logo">
          <img src="./tree_header.png" alt="anh ne" className="signup__img" />
          <h1>Smart Watering</h1>
        </div>
        <div className="signup__form">
          <h2 className="h2__title">Đăng ký</h2>

          <label htmlFor="" className="lable">
            Tên đăng nhập
          </label>
          <input
            type="text"
            className="input__signup"
            placeholder="Nhập tên đăng nhập"
            onChange={(e) => setUserName(e.target.value)}
          />

          <label htmlFor="" className="lable">
            Mật khẩu
          </label>
          <div className="password__wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className="input__signup"
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

          <label htmlFor="" className="lable">
            Nhập lại mật khẩu
          </label>
          <div className="password__wrapper">
            <input
              type={showRePassword ? "text" : "password"}
              className="input__signup"
              placeholder="Nhập mật khẩu"
              onChange={(e) => setRePassword(e.target.value)}
            />
            <span 
              className="password__toggle" 
              onClick={() => setShowRePassword(!showRePassword)}
            >
              {showRePassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>

          <label htmlFor="" className="lable">
            Email
          </label>
          <input
            type="email"
            className="input__signup"
            placeholder="Nhập Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="btn__group">
            <button className="btn__login" onClick={handleReturnClick}>
              Quay lại
            </button>
            <button className="btn__signup" onClick={handleSubmit}>
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
