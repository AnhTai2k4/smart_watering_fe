import { useDeviceContext } from "../../contexts/DeviceContext/DeviceContext";
import { deleteDevice } from "../../services/DeviceService/DeviceService";
import "./Device_card.css"
interface deviceCardProps {
    deviceName: String;
    id: String
}


const Device_card = ({ deviceName, id }: deviceCardProps) => {
    const { removeDevice } = useDeviceContext()
    const handleDelete = async () => {
        const res = await deleteDevice(id)
        if (res) console.log("xoa thanh cong thiet bi", id)
        removeDevice(id)
    }

    return (
        <div className="device__card">
            <div className="trash_icon" onClick={handleDelete}>
                <img src="./Trash.png" alt="Xoa device" />
            </div>

            <div className="tree_icon">
                <img src="./Tree_white.png" alt="Cay" />
            </div>

            <div className="device_name">
                <h3>{deviceName}</h3>

            </div>

        </div>
    )
}

export default Device_card
