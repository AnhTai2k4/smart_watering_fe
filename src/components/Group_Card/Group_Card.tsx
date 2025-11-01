import "./Group_card.css";

interface Props {
  groupName: string;
  id: string;
}
const handleNavigate = () =>{

}
const handleDelete = ()=>{

}
const Group_card = ({ groupName, id }: Props) => {
  return (
    <div className="device__card" >
            <div className="trash_icon" onClick={handleDelete}>
                <img src="./Trash.png" alt="Xoa device" />
            </div>

            <div className="tree_icon" onClick={handleNavigate}>
                <img src="./Tree_white.png" alt="Cay" />
            </div>

            <div className="device_name" onClick={handleNavigate}>
                <h3>{groupName}</h3>

            </div>

        </div>
  );
};

export default Group_card;
