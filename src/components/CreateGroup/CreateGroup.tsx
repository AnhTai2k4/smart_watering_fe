import "./CreateGroup.css";
import { useEffect, useState } from "react";
import axios from "axios";

interface Device {
  id: string;
  deviceId: string;
  name: string;
  online: boolean;
}

const CreateGroup = () => {
  const [groupName, setGroupName] = useState<string>("");
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiUrl = `${import.meta.env.VITE_BE_URL}/devices`;
        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.data) {
          setDevices(data.data);
        }
      } catch (error) {
        console.error("Lỗi khi fetch devices:", error);
      }
    };

    // Fetch devices when modal is opened
    const modal = document.getElementById("groupModal");
    if (modal) {
      const handleModalShow = () => {
        fetchDevices();
      };
      modal.addEventListener("show.bs.modal", handleModalShow);
      return () => {
        modal.removeEventListener("show.bs.modal", handleModalShow);
      };
    }
  }, []);

  const handleSelectAll = () => {
    if (selectedDevices.size === devices.length) {
      setSelectedDevices(new Set());
    } else {
      setSelectedDevices(new Set(devices.map((d) => d.id)));
    }
  };

  const handleToggleDevice = (deviceId: string) => {
    const newSelected = new Set(selectedDevices);
    if (newSelected.has(deviceId)) {
      newSelected.delete(deviceId);
    } else {
      newSelected.add(deviceId);
    }
    setSelectedDevices(newSelected);
  };

  const handleCreateGroup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!groupName.trim()) {
      alert("Vui lòng nhập tên nhóm");
      return;
    }
    if (selectedDevices.size === 0) {
      alert("Vui lòng chọn ít nhất một thiết bị");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const apiUrl = `${import.meta.env.VITE_BE_URL}/groups`;
      const res = await axios.post(
        apiUrl,
        {
          name: groupName,
          devices: Array.from(selectedDevices),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data) {
        // Reset form
        setGroupName("");
        setSelectedDevices(new Set());
        // Close modal
        const modal = document.getElementById("groupModal");
        if (modal) {
          const bsModal = (window as any).bootstrap?.Modal?.getInstance(modal);
          if (bsModal) {
            bsModal.hide();
          }
        }
        // Reload page or refresh groups list
        window.location.reload();
      }
    } catch (error) {
      console.error("Lỗi khi tạo nhóm:", error);
      alert("Có lỗi xảy ra khi tạo nhóm");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setGroupName("");
    setSelectedDevices(new Set());
  };

  const selectedCount = selectedDevices.size;
  const totalDevices = devices.length;
  const isAllSelected = devices.length > 0 && selectedDevices.size === devices.length;

  return (
    <div
      className="modal fade"
      id="groupModal"
      tabIndex={-1}
      aria-labelledby="groupModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content create-group-modal">
          <div className="create-group-header">
            <h1 className="create-group-title">Thêm nhóm thiết bị</h1>
            <button
              type="button"
              className="create-group-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#6b7280">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
              </svg>
            </button>
          </div>

          <div className="create-group-body">
            <p className="create-group-description">
              Tạo tên nhóm và chọn thiết bị để thêm vào nhóm
            </p>

            <div className="create-group-form">
              <label className="create-group-label">Tên nhóm</label>
              <input
                type="text"
                className="create-group-input"
                placeholder="Nhập tên nhóm..."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>

            <div className="create-group-device-section">
              <label className="create-group-label">Chọn thiết bị</label>
              
              <div className="create-group-select-all">
                <label className="create-group-checkbox-label">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="create-group-checkbox"
                  />
                  <span>Chọn tất cả</span>
                </label>
                <span className="create-group-counter">
                  {selectedCount}/{totalDevices}
                </span>
              </div>

              <div className="create-group-device-list">
                {devices.map((device) => (
                  <div
                    key={device.id}
                    className={`create-group-device-item ${
                      selectedDevices.has(device.id) ? "create-group-device-item--selected" : ""
                    }`}
                    onClick={() => handleToggleDevice(device.id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDevices.has(device.id)}
                      onChange={() => handleToggleDevice(device.id)}
                      className="create-group-checkbox"
                    />
                    <div className="create-group-device-info">
                      <div className="create-group-device-name">{device.name}</div>
                      <div className="create-group-device-id">{device.deviceId}</div>
                    </div>
                    {device.online && (
                      <div className="create-group-wifi-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#5baa3b">
                          <path d="M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm0-320q-33 0-56.5-23.5T400-520q0-33 23.5-56.5T480-600q33 0 56.5 23.5T560-520q0 33-23.5 56.5T480-440Z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="create-group-footer">
            <button
              type="button"
              className="create-group-cancel-btn"
              data-bs-dismiss="modal"
              onClick={handleCancel}
            >
              Hủy
            </button>
            <button
              type="button"
              className="create-group-submit-btn"
              onClick={handleCreateGroup}
              disabled={loading}
            >
              {loading ? "Đang tạo..." : "Tạo nhóm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
