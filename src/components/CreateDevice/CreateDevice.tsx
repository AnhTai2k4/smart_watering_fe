import "./CreateDevice.css";

const CreateDevice = () => {
  return (
    <div
      className="modal fade"
      id="deviceModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Thêm thiết bị
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                  ID Thiết bị:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="device-id"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">
                  Tên thiết bị:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="device-name"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Send message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDevice;
