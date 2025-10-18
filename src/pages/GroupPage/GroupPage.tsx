import Device_card from "../../components/Device_card/Device_card";
import CreateDevice from "../../components/CreateDevice/CreateDevice";
import "./GroupPage.css";
const GroupPage = () => {
  return (
    <div className="device__page">
      <div className="device__section">
        <h2>Xin chào, Anh Tài!</h2>
        <p>Chọn một trong các nhóm sau:</p>
        <div className="device__container">
          <Device_card deviceName="Tai" />
          <Device_card deviceName="Tai" />
          <Device_card deviceName="Tai" />
          <Device_card deviceName="Tai" />
        </div>
        <div className="dropup-center dropup dropup__container">
          <button
            className="btn btn-secondary dropdown-toggle btn__container"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src="./add_button.png" alt="add_button" className="add__icon" />
            <h3>Thêm</h3>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="" onClick={()=>{return <CreateDevice/>}}>
                Thêm thiết bị
              </a>
            </li>
            <hr/>
            <li>
              <a className="dropdown-item" href="#">
                Thêm nhóm
              </a>
            </li>           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
