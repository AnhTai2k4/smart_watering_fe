import "./GroupPage.css";
import { useEffect, useState } from "react";
import Group_Card from "../../components/Group_Card/Group_Card";

const GroupPage = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
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
      }
    };
    fetchGroups();
  }, []);

  return (
    <div className="group__page">
      <div className="navigator">
        <a href="./device_page">Tat ca nhóm</a>
        <a href="./group_page">Nhom thiet bi</a>
      </div>

      <div className="group__section">
        <h2>Xin chao, Anh Tai!</h2>
        <p>Chon mot nhom duoi day de xem chi tiet:</p>

        <div className="group__container">
          {groups.map((group: any, id: number) => (
            <Group_Card key={id} groupName={group.name} id={group.id} />
          ))}
        </div>

        <div className="dropup-center dropup dropup__container">
          <button
            className="btn btn-secondary dropdown-toggle btn__container"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="./add_button.png"
              alt="add_button"
              className="add__icon"
            />
            <h3>Them</h3>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#groupModal"
              >
                Them nhom
              </a>
            </li>
            <hr />
            <li>
              <a className="dropdown-item" href="#">
                Them thiet bi
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
