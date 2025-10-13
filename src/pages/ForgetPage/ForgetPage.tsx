import "./ForgetPage.css"
const ForgetPage = () => {
  return (
    <div className="signup__section">
      <div className="signup__container">
        <div className="signup__logo">
          <img src="./Tree.png" alt="anh ne" className="signup__img" />
          <h1>Smart Sprout</h1>
        </div>
        <div className="signup__form">
          <h2 className="h2__title">Đặt lại mật khẩu</h2>

          <label htmlFor="" className="lable">
            Tên đăng nhập
          </label>
          <input
            type="text"
            className="input__signup"
            placeholder="Nhập tên đăng nhập"
          />

          <label htmlFor="" className="lable">
            Mật khẩu mới
          </label>
          <input
            type="password"
            className="input__signup"
            placeholder="Nhập mật khẩu"
          />

          <label htmlFor="" className="lable">
            Nhập lại mật khẩu mới
          </label>
          <input
            type="password"
            className="input__signup"
            placeholder="Nhập mật khẩu"
          />

          <button className="btn__signup">Xác nhận</button>

        </div>
      </div>
    </div>
  )
}

export default ForgetPage
