import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

export const MenuItem = (props) => {
  const { name, submenus, iconClassName, onClick, to } = props;
  const [expand, setExpand] = useState(false);

  return (
    <li onClick={props.onClick}>
      <NavLink to={to} onClick={() => setExpand(!expand)} className="menu-item">
        <div className="menu-item-logo">
          <i className={iconClassName}></i>
        </div>
        <span>{name}</span>
      </NavLink>
      {submenus && submenus.length > 0 ? (
        <ul className={`sub-menu ${expand ? "active" : ""}`}>
          {submenus.map((item, index) => (
            <li key={index} className="li">
              <NavLink to={item.to}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
};
