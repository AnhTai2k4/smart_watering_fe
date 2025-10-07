import "./LoginPage.css"
const LoginPage = () => {
  return (
    <div className='login__section'>
      <div className="login__container">
        <div className="login__logo">
          <img src="./Tree.png" alt="anh ne" className="login__img"/>
          <h1 >Smart Sprout</h1>
        </div>
        <div className="login__form"> 
          <h2 className="h2__title">Đăng nhập</h2>

          <label htmlFor="" className="lable">Tên đăng nhập</label>
          <input type="text" className="input__login" placeholder='Nhập tên đăng nhập' />

          <label htmlFor="" className="lable">Mật khẩu</label>
          <input type="password" className="input__login" placeholder='Nhập mật khẩu'/>

          <button className="btn__login">Đăng nhập</button>

        </div>
      </div>

      
    </div>
  )
}

export default LoginPage
