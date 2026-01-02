import "./DataGroupPage.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Device_card from "../../components/Device_card/Device_card";
import { getGroupById } from "../../services/GroupService/GroupService";
import UpdateGroup from "../../components/UpdateGroup/UpdateGroup";

type DeviceItem = {
  id: string;
  name: string;
  deviceId?: string;
  updatedAt?: string;
  online?: boolean;
};

const DataGroupPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const groupNameParam = searchParams.get("group-name") || "";

  const [groupName, setGroupName] = useState(groupNameParam);
  const [devices, setDevices] = useState<DeviceItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [fieldSort, setFieldSort] = useState<string>("Sắp xếp");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGroupDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getGroupById(id);
        setGroupName(data?.data?.name || groupNameParam);
        setDevices(data?.data?.devices || []);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết nhóm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroupDetail();
  }, [id, groupNameParam]);

  const removeDiacritics = (str: string): string => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  const normalizedSearchTerm = removeDiacritics(searchTerm.toLowerCase());

  const sortedDevices = useMemo(() => {
    const devicesCopy = [...devices];
    switch (fieldSort) {
      case "name":
        return devicesCopy.sort((a, b) =>
          (a.name || "").localeCompare(b.name || "")
        );
      case "updatedAt":
        return devicesCopy.sort((a, b) => {
          const timeA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          const timeB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
          return timeB - timeA;
        });
      case "online":
        return devicesCopy.sort((a, b) => Number(b.online) - Number(a.online));
      default:
        return devicesCopy;
    }
  }, [devices, fieldSort]);

  const filteredDevices = sortedDevices.filter((device) => {
    const normalizedDeviceName = removeDiacritics(device.name.toLowerCase());
    return normalizedDeviceName.includes(normalizedSearchTerm);
  });

  const sortLabel = useMemo(() => {
    switch (fieldSort) {
      case "name":
        return "Theo tên";
      case "updatedAt":
        return "Ngày cập nhật";
      case "online":
        return "Đang online";
      default:
        return "Sắp xếp";
    }
  }, [fieldSort]);

  const handleSort = (field: string, label: string) => {
    console.log("field: ", field);
    console.log("label: ", label);
    if (field === "") {
      setFieldSort("Sắp xếp");
    } else {
      setFieldSort(field);
    }
  };

  return (
    <div className="data-group-page">
      <div className="data-group-page__inner">
        <header className="data-group-page__header">
          <div>
            <h1 className="data-group-page__title">Nhóm: {groupName}</h1>
            <p className="data-group-page__subtitle">
              Xem và quản lý các thiết bị trong nhóm này.
            </p>
          </div>
        </header>

        <div className="data-group-page__toolbar">
          <div className="data-group-search">
            <span className="data-group-search__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#78A75A"
              >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm thiết bị..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="data-group-search__input"
            />
          </div>

          <div className="dropdown">
            <button
              className="dropdown-toggle data-group-sort-btn"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="data-group-sort-btn__icon">↕</span>
              <span>{sortLabel}</span>
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleSort("", "Sắp xếp")}
                >
                  Mặc định
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleSort("name", "Theo tên")}
                >
                  Theo tên
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleSort("updatedAt", "Ngày cập nhật")}
                >
                  Ngày cập nhật
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleSort("online", "Đang online")}
                >
                  Đang online
                </a>
              </li>
            </ul>
          </div>

         
        </div>

        <div className="data-group__section">
          <div className="data-group__container">
            {loading ? (
              <div className="loading-message">
                Đang lấy danh sách thiết bị...
              </div>
            ) : filteredDevices.length === 0 ? (
              <div className="empty-message">
                <div className="empty-message__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="80px"
                    viewBox="0 -960 960 960"
                    width="80px"
                    fill="#9ca3af"
                  >
                    <path d="M480-120q-88 0-168.5-33T169-249l57-57q51 51 117 78.5T481-200q72 0 137.5-27T735-305l56 56q-63 63-143 96t-168 33Zm0-160q-56 0-107-21t-91-61l56-56q29 29 65.5 43.5T480-360q40 0 76.5-14.5T622-418l56 56q-40 40-91 61t-107 21ZM200-760v40h560v-40H200Zm124 120 12 40h288l12-40H324Zm12 120q-26 0-47-15.5T260-576l-20-64h-40q-33 0-56.5-23.5T120-720v-120h720v120q0 33-23.5 56.5T760-640h-40l-26 68q-9 23-29 37.5T620-520H336ZM200-760v40-40Z" />
                  </svg>
                </div>
                <p className="empty-message__text">Không có thiết bị</p>
              </div>
            ) : (
              filteredDevices.map((device, id) => (
                <Device_card key={id} deviceName={device.name} id={device.id} />
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
                src="./add_button.png"
                alt="add_button"
                className="add__icon"
              />
              <h3>Bơm / Sửa</h3>
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  onClick={() =>
                    navigate(
                      `/schedule_group_page?groupId=${id}&groupName=${groupName}`
                    )
                  }
                >
                  Bơm theo nhóm
                </a>
              </li>

              <hr/>

              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#groupModal"
                >
                  Sửa nhóm
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <UpdateGroup groupId={id} />
    </div>
  );
};

export default DataGroupPage;
