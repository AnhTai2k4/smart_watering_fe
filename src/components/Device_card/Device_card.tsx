import "./Device_card.css"
interface deviceCardProps {
    deviceName: String,
}

const Device_card= ({deviceName}:deviceCardProps) => {
  return (
    <div className="device__card">
        <div className="trash_icon">
            <img src="./Trash.png" alt="Xoa device" />
        </div>
        
        <div className="tree_icon">
            <img src="./Tree_white.png" alt="Cay" />
        </div>
        
        <div className="device_name">
            <h3>{deviceName} ne</h3>

        </div>
        
    </div>
  )
}

export default Device_card
