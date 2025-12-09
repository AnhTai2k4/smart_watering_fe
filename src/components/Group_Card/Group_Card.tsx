import { useNavigate } from "react-router-dom";
import { deleteGroup } from "../../services/GroupService/GroupService";
import "./Group_card.css";

interface Props {
  groupName: string;
  id: string;
}

const Group_card = ({ groupName, id }: Props) => {

  const navigate = useNavigate()
  const handleNavigate = () =>{
    navigate(`/data_group_page?id=${id}&group-name=${groupName}`)

  }
  const handleDelete = async ()=>{
    const res = await deleteGroup(id)
    if (res) console.log("xoa thanh cong nhom", id)
  
  }
  return (
    <div className="group__card" >
            <div className="trash_icon" onClick={handleDelete}>
                <img src="./Trash.png" alt="Xoa device" />
            </div>

            <div className="group_icon" onClick={handleNavigate}>
                <img src="./Tree_white.png" alt="Cay" />
            </div>

            <div className="device_name" onClick={handleNavigate}>
                <h3>{groupName}</h3>

            </div>

        </div>
  );
};

export default Group_card;
