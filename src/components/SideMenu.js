import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "./MenuItem";

function SideMenu(props) {
  const [inactive, setInactive] = useState(false);
  const menuItems = [
    { name: "Home", iconClassName: "bi bi-house", to: "/homescreen" },
    {
      name: "User Settings",
      submenus: [
        { name: "Create User", to: "/createuser" },
        { name: "Role Setting", to: "/rolesetting" },
        { name: "Screen Setup", to: "/screensetup" },
        // { name: "Privilage Setup", to: "/privelagesetup" },
      ],
      iconClassName: "bi bi-gear",
      to: "/usersetting",
    },
    { name: "Products", iconClassName: "bi bi-bookmark-dash", to: "/contents" },
  ];

  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.removeItem("usertoken");
    navigate("/login");
  };
  useEffect(() => {
    if (inactive) {
      document.querySelectorAll(".sub-menu").forEach((el) => {
        el.classList.remove("active");
      });
    }
    props.onCollapse(inactive);
  }, [inactive]);

  return (
    <div className={`sideMenu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo">
          <img
            src="https://infodev.com.np/static/media/logonew.920b2087.svg"
            alt="logo"
          />
        </div>
        <div className="toggle-menu-btn" onClick={() => setInactive(!inactive)}>
          {inactive ? (
            <i className="bi bi-arrow-right-square-fill"></i>
          ) : (
            <i className="bi bi-arrow-left-square-fill"></i>
          )}
        </div>
      </div>
      <div className="divider"></div>
      <div className="main-menu">
        <ul>
          {menuItems.map((menuitem, index) => (
            <MenuItem
              key={index}
              name={menuitem.name}
              submenus={menuitem.submenus || []}
              iconClassName={menuitem.iconClassName}
              onClick={() => {
                if (inactive) {
                  setInactive(false);
                }
              }}
              to={menuitem.to}
            />
          ))}
        </ul>
      </div>
      <button
        className={`add-users ${inactive ? "inactive" : ""}`}
        onClick={() => logout()}
      >
        Log Out
      </button>
    </div>
  );
}

export default SideMenu;
