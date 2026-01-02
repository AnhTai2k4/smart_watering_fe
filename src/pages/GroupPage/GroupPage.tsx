import "./GroupPage.css";
import { useEffect, useState } from "react";
import Group_Card from "../../components/Group_Card/Group_Card";
import CreateGroup from "../../components/CreateGroup/CreateGroup";

const GroupPage = () => {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [fieldSort, setFieldSort] = useState<string>('Sắp xếp')
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const apiUrl = `${import.meta.env.VITE_BE_URL}/groups?page=0&size=5`;
        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log("all group", data);
        setGroups(data.data || []);
      } catch (error) {
        console.error("Loi khi fetch group:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  },[]);

  const handleGetGroup = async (field: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const apiUrl = `${import.meta.env.VITE_BE_URL}/groups?page=0&size=5&sort=${field}`;
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("all group", data);
      setGroups(data.data || []);
    } catch (error) {
      console.error("Loi khi fetch device:", error);
    } finally {
      setLoading(false);
    }

  }

  // Hàm chuẩn hóa chuỗi để tìm kiếm không dấu
  const removeDiacritics = (str: string): string => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d").replace(/Đ/g, "D");
  };

  // Logic lọc danh sách nhóm
  const normalizedSearchTerm = removeDiacritics(searchTerm.toLowerCase());

  const filteredGroups = groups.filter((group: any) => {
    const normalizedGroupName = removeDiacritics(group.name.toLowerCase());
    return normalizedGroupName.includes(normalizedSearchTerm);
  });

  return (
    <div className="group-page">
      <div className="group-page__inner">
        <header className="group-page__header">
          <div>
            <h1 className="group-page__title">Tất cả nhóm</h1>
            <p className="group-page__subtitle">
              Chọn một trong các nhóm dưới đây để xem chi tiết và quản lý.
            </p>
          </div>
        </header>

        <div className="group-page__toolbar">
          <div className="group-search">
            <span className="group-search__icon">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#a09f9f"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm nhóm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="group-search__input"
            />
          </div>

          <div className="dropdown">
            <button className=" dropdown-toggle group-sort-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <span className="group-sort-btn__icon">↕</span>
              <span>{fieldSort}</span>
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#" onClick={() => { handleGetGroup(""); setFieldSort("Mặc định") }}>Mặc định</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => { handleGetGroup("name"); setFieldSort("Theo tên") }}>Theo tên</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => { handleGetGroup("updatedAt"); setFieldSort("Ngày cập nhật") }}>Ngày cập nhật</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => { handleGetGroup("online"); setFieldSort("Đang online") }}>Đang online</a></li>
            </ul>
          </div>


        </div>

        <div className="group__section">
          <div className="group__container">
            {loading ? (
              <div className="loading-message">Đang lấy danh sách nhóm...</div>
            ) : filteredGroups.length === 0 ? (
              <div className="empty-message">
                <div className="empty-message__icon">
                  <svg xmlns="http://www.w3.org/2000/svg" height="80px" viewBox="0 -960 960 960" width="80px" fill="#9ca3af">
                    <path d="M320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-320H520v-160H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/>
                  </svg>
                </div>
                <p className="empty-message__text">Không có nhóm</p>
              </div>
            ) : (
              filteredGroups.map((group: any, id: number) => (
                <Group_Card key={id} groupName={group.name} id={group.id} />
              ))
            )}
          </div>

          <div className="dropup-center dropup dropup__container">
            <button
              className="btn btn-secondary dropdown-toggle btn__container"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="/add_button.png"
                alt="add_button"
                className="add__icon"
              />
              <h3>Thêm</h3>
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#groupModal"
                >
                  Thêm nhóm
                </a>
              </li>

              <hr/>
              
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#deviceModal"
                >
                  Thêm thiết bị
                </a>
              </li>

              
            </ul>
          </div>
        </div>
      </div>
      <CreateGroup />
      {/* <CreateDevice/> */}
    </div>
  );
};

export default GroupPage;
