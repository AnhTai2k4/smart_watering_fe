import "./Footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__left">
        <h2 className="footer__logo">Smart Watering</h2>
        <p className="footer__desc">
          Giải pháp tưới cây thông minh giúp tiết kiệm nước và công sức.
        </p>
      </div>

      <div className="footer__links">
        <a href="#">Giới thiệu</a>
        <a href="#">Hỗ trợ</a>
        <a href="#">Chính sách bảo hành</a>
        <a href="#">Liên hệ</a>
      </div>

      <div className="footer__right">
        <p>© 2025 Smart Watering. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
