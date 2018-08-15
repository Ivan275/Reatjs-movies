import React from "react";

const ListGroup = props => {
  const { items, onItemSelect, itemName, itemId, selectedItem } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          className={
            selectedItem === item ? "list-group-item active" : "list-group-item"
          }
          key={item[itemId]}
          onClick={() => onItemSelect(item)}
        >
          {item[itemName]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  itemName: "name",
  itemId: "_id"
};

export default ListGroup;
