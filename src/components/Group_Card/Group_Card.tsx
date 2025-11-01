import "./Group_card.css";

interface Props {
  groupName: string;
  id: string;
}

const Group_card = ({ groupName, id }: Props) => {
  return (
    <div className="group__card">
      <h3>{groupName}</h3>
      <p>ID: {id}</p>
    </div>
  );
};

export default Group_card;
