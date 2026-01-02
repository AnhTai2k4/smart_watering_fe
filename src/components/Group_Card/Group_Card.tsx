import { useNavigate } from "react-router-dom";
import { deleteGroup } from "../../services/GroupService/GroupService";
import "./Group_Card.css";

interface Props {
  groupName: string;
  id: string;
}

const Group_card = ({ groupName, id }: Props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/data_group_page?id=${id}&group-name=${groupName}`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // tránh click vào card
    const res = await deleteGroup(id);
    if (res) console.log("Xóa thành công nhóm", id);
  };

  return (
    <div className="group__card" onClick={handleNavigate}>
      {/* DELETE ICON */}
      <div className="trash_icon" onClick={handleDelete}>
        <img src="/Trash.png" alt="Xóa group" />
      </div>

      {/* ICON GROUP */}
      <div className="group_icon">
        <img src="/tree_icon.png" alt="Group" />
      </div>

      {/* GROUP NAME */}
      <div className="group_name">
        <h3>{groupName}</h3>
      </div>
    </div>
  );
};

export default Group_card;
