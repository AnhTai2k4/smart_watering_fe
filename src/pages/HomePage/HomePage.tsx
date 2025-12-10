import React, {  useEffect, useState } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { getAllDevice } from "../../services/DeviceService/DeviceService";
import { getUser } from "../../services/UserService/UserService";
import { getAllGroup } from "../../services/GroupService/GroupService";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  thumb: string;
  redirectUrl?: string;
  url?: string;
}

const NEWS_API =
  "https://w-api.baomoi.com/api/v1/content/get/list-by-custom?listType=tag&keyword=C%C3%A2y%20tr%E1%BB%93ng&page=4&ctime=1763528630&version=0.7.53&sig=119944343615326522a980f8beb359663fd08f0cb0c973abbacaa86764d41e5c&apiKey=kI44ARvPwaqL7v0KuDSM0rGORtdY1nnw";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState<boolean>(false);
  const [errorNews, setErrorNews] = useState<string | null>(null);
  const username = localStorage.getItem("username")
  const [listDevice, setListDevice] = useState<any[]>([]);
  const [listGroup, setListGroup] = useState<any[]>([]);
  const [loadingDevice, setLoadingDevice] = useState<boolean>(true);
  const [loadingGroup, setLoadingGroup] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"device" | "group">("device");
  console.log(username)

  useEffect(() => {
    const allDevice = async () => {
      try {
        setLoadingDevice(true);
        const res = await getAllDevice();
        console.log("all device", res)
        setListDevice(res.data || [])
      } catch (error) {
        console.error("Error fetching devices:", error)
        setListDevice([])
      } finally {
        setLoadingDevice(false);
      }
    }

    allDevice();
  }, [])

  useEffect(() => {
    const allGroup = async () => {
      try {
        setLoadingGroup(true);
        const res = await getAllGroup();
        console.log("all group", res)
        setListGroup(res.data || [])
      } catch (error) {
        console.error("Error fetching groups:", error)
        setListGroup([])
      } finally {
        setLoadingGroup(false);
      }
    }

    allGroup();
  }, [])

  useEffect(() => {
    const getEmailVerified = async () => {
      const res = await getUser()
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("verified", res.data.verified);
    }

    getEmailVerified();
  }, [])


  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoadingNews(true);
        setErrorNews(null);
        const res = await fetch(NEWS_API);
        const data = await res.json();
        const items = (data?.data?.items || []) as any[];
        const mapped: NewsItem[] = items.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          thumb: item.thumbL || item.thumb,
          redirectUrl: item.redirectUrl,
          url: item.url,
        }));
        setNews(mapped);
      } catch (err) {
        console.error("Error fetching news", err);
        setErrorNews("Không tải được tin tức. Vui lòng thử lại sau.");
      } finally {
        setLoadingNews(false);
      }
    };

    fetchNews();
  }, []);


  const handleOpenArticle = (item: NewsItem) => {
    const path = item.redirectUrl || item.url;
    if (!path) return;
    const fullUrl = path.startsWith("http")
      ? path
      : `https://baomoi.com${path}`;
    window.open(fullUrl, "_blank");
  };

  return (
    <div className="home-page">
      <section className="home-hero">
        <div>
          <p className="home-hero__welcome">Xin chào,</p>
          <h1 className="home-hero__username">
            {username ? username.toUpperCase() : "nguoi dung".toUpperCase()}
          </h1>
          {username ? <p className="home-hero__welcome">Hệ thống tưới tự động của bạn đang hoạt động tốt</p> : <p className="home-hero__welcome">Bạn cần đăng nhập để sử dụng hệ thống tưới cây</p>}
        </div>
        <button
          className="home-hero__primary-btn"
          onClick={() => navigate("/device_page")}
        >
          Xem thiết bị
        </button>
      </section>

      <section className="home-section">
        <div className="home-section__header">
          <h2>Lịch tưới sắp tới</h2>
          <button className="home-section__view-all" onClick={() => navigate("/device_page")}>
            Xem tất cả
          </button>
        </div>

        <div className="home-tabs">
          <button 
            className={`home-tab ${activeTab === "device" ? "home-tab--active" : ""}`}
            onClick={() => setActiveTab("device")}
          >
            Theo thiết bị
          </button>
          <button 
            className={`home-tab ${activeTab === "group" ? "home-tab--active" : ""}`}
            onClick={() => setActiveTab("group")}
          >
            Theo nhóm
          </button>
        </div>

        {activeTab === "device" ? (
          <div className="home-schedule-list">
            {loadingDevice ? (
              <div className="home-schedule-loading">
                <div className="home-schedule-loading__spinner"></div>
                <p className="home-schedule-loading__text">Đang lấy danh sách lịch tưới...</p>
              </div>
            ) : listDevice.filter(item => item.nextSchedule).length === 0 ? (
              <div className="home-schedule-empty">
                <div className="home-schedule-empty__icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                    <line x1="12" y1="10" x2="12" y2="16"></line>
                    <line x1="12" y1="16" x2="16" y2="16"></line>
                  </svg>
                  <div className="home-schedule-empty__x">✕</div>
                </div>
                <p className="home-schedule-empty__text">Không có lịch tưới thiết bị sắp tới</p>
              </div>
            ) : (
              listDevice.map((item) => (
                item.nextSchedule ?
                  <div key={item.id} className="home-schedule-card">
                    <div className="home-schedule-card__left">
                      <div className="home-schedule-card__icon">
                        <span role="img" aria-label="clock">
                          ⏰
                        </span>
                      </div>
                      <div>
                        <h3>{item.name}</h3>
                        <p className="home-schedule-card__time">{item.nextSchedule.startTime}</p>
                        <p className="home-schedule-card__duration">Bơm {item.nextSchedule.duration}s</p>
                      </div>
                    </div>
                    <div className="home-schedule-card__right">Còn {Math.floor(item.nextSchedule.runAfter / 3600)} giờ {Math.floor(item.nextSchedule.runAfter / 60) - Math.floor(item.nextSchedule.runAfter / 3600) * 60} phút</div>
                  </div>
                  :
                  null
              ))
            )}
          </div>
        ) : (
          <div className="home-schedule-list">
            {loadingGroup ? (
              <div className="home-schedule-loading">
                <div className="home-schedule-loading__spinner"></div>
                <p className="home-schedule-loading__text">Đang lấy danh sách lịch tưới...</p>
              </div>
            ) : listGroup.filter((item: any) => item.nextSchedule).length === 0 ? (
              <div className="home-schedule-empty">
                <div className="home-schedule-empty__icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                    <line x1="12" y1="10" x2="12" y2="16"></line>
                    <line x1="12" y1="16" x2="16" y2="16"></line>
                  </svg>
                  <div className="home-schedule-empty__x">✕</div>
                </div>
                <p className="home-schedule-empty__text">Không có lịch tưới nhóm sắp tới</p>
              </div>
            ) : (
              listGroup.map((item: any) => (
                item.nextSchedule ?
                  <div key={item.id} className="home-schedule-card">
                    <div className="home-schedule-card__left">
                      <div className="home-schedule-card__icon">
                        <span role="img" aria-label="clock">
                          ⏰
                        </span>
                      </div>
                      <div>
                        <h3>{item.name}</h3>
                        <p className="home-schedule-card__time">{item.nextSchedule.startTime}</p>
                        <p className="home-schedule-card__duration">Bơm {item.nextSchedule.duration}s</p>
                      </div>
                    </div>
                    <div className="home-schedule-card__right">Còn {Math.floor(item.nextSchedule.runAfter / 3600)} giờ {Math.floor(item.nextSchedule.runAfter / 60) - Math.floor(item.nextSchedule.runAfter / 3600) * 60} phút</div>
                  </div>
                  :
                  null
              ))
            )}
          </div>
        )}
      </section>

      <section className="home-section">
        <div className="home-section__header">
          <h2>Tin tức cây trồng</h2>
          <a
            className="home-section__view-all"
            href="https://baomoi.com/tin-tuc/cay-trong.epi"
            target="_blank"
            rel="noreferrer"
          >
            Xem thêm
          </a>
        </div>

        {loadingNews && <p className="home-news__state">Đang tải tin tức...</p>}
        {errorNews && <p className="home-news__state home-news__state--error">{errorNews}</p>}

        {!loadingNews && !errorNews && (
          <div className="home-news-list">
            {news.map((item) => (
              <article
                key={item.id}
                className="home-news-card"
                onClick={() => handleOpenArticle(item)}
              >
                <div className="home-news-card__thumb-wrapper">
                  {item.thumb && (
                    <img
                      src={item.thumb}
                      alt={item.title}
                      className="home-news-card__thumb"
                    />
                  )}
                </div>
                <div className="home-news-card__content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;


