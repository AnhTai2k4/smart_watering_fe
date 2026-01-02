import React from "react";
import "./IntroducePage.css";

const IntroducePage: React.FC = () => {
  return (
    <div className="introduce-page">
      {/* Hero Banner Section */}


      {/* Story Section */}
      <section className="introduce-story">
        <div className="introduce-story__container">
          <h2 className="introduce-story__title">
            <span className="introduce-story__title-text">Câu chuyện của chúng tôi</span>
            <span className="introduce-story__title-underline"></span>
          </h2>
          <div className="introduce-story__content">
            <p className="introduce-story__paragraph">
              Smart Watering là một nền tảng web điều khiển hệ thống tưới cây IoT hoàn toàn tự động,
              được sáng tác và phát triển bởi bốn thành viên: <strong>Trần Thanh Anh Tài</strong>,
              <strong> Lưu Ngọc Lợi</strong>, <strong>Phan Minh Vượng</strong> và <strong>Nguyễn Khổng Duy Hoàng</strong>.
            </p>
            <p className="introduce-story__paragraph">
              Hệ thống cho phép người dùng theo dõi độ ẩm đất, bật/tắt thiết bị, đặt lịch tưới và nhận
              thông báo thời gian thực ngay trên điện thoại hoặc máy tính. Smart Watering mang đến sự tiện lợi
              trong chăm sóc cây, giúp tiết kiệm nước, tối ưu thời gian và đảm bảo cây luôn được tưới đúng nhu cầu.
            </p>
            <p className="introduce-story__paragraph">
              Dự án hướng đến mục tiêu tạo ra một giải pháp tưới tiêu hiện đại, hiệu quả và dễ tiếp cận cho mọi người dùng.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="introduce-stats">
        <div className="introduce-stats__container">
          <div className="introduce-stats__item">
            <div className="introduce-stats__number">100%</div>
            <div className="introduce-stats__label">Tự động hóa</div>
          </div>
          <div className="introduce-stats__item">
            <div className="introduce-stats__number">24/7</div>
            <div className="introduce-stats__label">Giám sát liên tục</div>
          </div>
          <div className="introduce-stats__item">
            <div className="introduce-stats__number">IoT</div>
            <div className="introduce-stats__label">Công nghệ hiện đại</div>
          </div>
          <div className="introduce-stats__item">
            <div className="introduce-stats__number">Tiết kiệm</div>
            <div className="introduce-stats__label">Nước và thời gian</div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="introduce-values">
        <div className="introduce-values__container">
          <div className="introduce-values__header">
            <h2 className="introduce-values__title">
              Giá trị cốt lõi
              <span className="introduce-values__title-underline"></span>
            </h2>
            <p className="introduce-values__subtitle">
              Những nguyên tắc định hướng mọi hoạt động của chúng tôi
            </p>
          </div>
          <div className="introduce-values__grid">
            <div className="introduce-values__card">
              <div className="introduce-values__icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#5baa3b">
                  <path d="M480-120 330-270l56-56 94 94 244-244 56 56-350 350Zm0-360L330-630l56-56 94 94 244-244 56 56-350 350Z" />
                </svg>
              </div>
              <h3 className="introduce-values__card-title">Chất lượng</h3>
              <p className="introduce-values__card-text">
                Chúng tôi đảm bảo mang đến hệ thống tưới cây chất lượng cao với độ chính xác và độ tin cậy tốt nhất
              </p>
            </div>
            <div className="introduce-values__card">
              <div className="introduce-values__icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#5baa3b">
                  <path d="M480-480Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Zm-32-240 128-128-57-57-71 71-40-40-56 56 128 128Z" />
                </svg>
              </div>
              <h3 className="introduce-values__card-title">Người dùng</h3>
              <p className="introduce-values__card-text">
                Đặt người dùng là trung tâm trong mọi quyết định phát triển và cải tiến sản phẩm của chúng tôi
              </p>
            </div>
            <div className="introduce-values__card">
              <div className="introduce-values__icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#5baa3b">
                  <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-80-160 240-240-56-56-184 184-56-56 56-56 56 56 240-240 56 56-296 296-56-56Z" />
                </svg>
              </div>
              <h3 className="introduce-values__card-title">Bền vững</h3>
              <p className="introduce-values__card-text">
                Cam kết với các giá trị bền vững, tiết kiệm tài nguyên và thân thiện với môi trường
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="introduce-team">
        <div className="introduce-team__container">
          <div className="introduce-team__header">
            <h2 className="introduce-team__title">
              Đội ngũ của chúng tôi
              <span className="introduce-team__title-underline"></span>
            </h2>
            <p className="introduce-team__subtitle">
              Những người tài năng đứng sau thành công của Smart Watering
            </p>
          </div>
          <div className="introduce-team__grid">
            <div className="introduce-team__card">
              <div className="introduce-team__avatar">
                <div className="introduce-team__avatar-placeholder">
                  <span className="introduce-team__avatar-initial">TT</span>
                </div>
              </div>
              <h3 className="introduce-team__name">Trần Thanh Anh Tài</h3>
              <p className="introduce-team__role">Frontend Developer (Web)</p>
              <p className="introduce-team__description">
                Chuyên gia thiết kế giao diện và trải nghiệm người dùng Web
              </p>
            </div>
            <div className="introduce-team__card">
              <div className="introduce-team__avatar">
                <div className="introduce-team__avatar-placeholder">
                  <span className="introduce-team__avatar-initial">LN</span>
                </div>
              </div>
              <h3 className="introduce-team__name">Lưu Ngọc Lợi</h3>
              <p className="introduce-team__role">Backend Developer</p>
              <p className="introduce-team__description">
                Chuyên gia phát triển backend và hệ thống IoT
              </p>
            </div>
            <div className="introduce-team__card">
              <div className="introduce-team__avatar">
                <div className="introduce-team__avatar-placeholder">
                  <span className="introduce-team__avatar-initial">PM</span>
                </div>
              </div>
              <h3 className="introduce-team__name">Phan Minh Vượng</h3>
              <p className="introduce-team__role">Frontend Developer (App)</p>
              <p className="introduce-team__description">
                Chuyên gia thiết kế giao diện và trải nghiệm người dùng Mobile
              </p>
            </div>
            <div className="introduce-team__card">
              <div className="introduce-team__avatar">
                <div className="introduce-team__avatar-placeholder">
                  <span className="introduce-team__avatar-initial">NK</span>
                </div>
              </div>
              <h3 className="introduce-team__name">Nguyễn Khổng Duy Hoàng</h3>
              <p className="introduce-team__role">IoT Engineer</p>
              <p className="introduce-team__description">
                Chuyên gia phát triển web, phần cứng và tích hợp hệ thống IoT
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntroducePage;
