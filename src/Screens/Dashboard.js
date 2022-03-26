import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import SideMenu from "../components/SideMenu";

function Dashboard() {
  const [inactive, setInactive] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("usertoken")) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div className="flex-container">
        <div
          className={` ${inactive ? "flex-child1 inactive" : "flex-child1"}`}
        >
          <SideMenu
            onCollapse={(inactive) => {
              console.log(inactive);
              setInactive(inactive);
            }}
          />
        </div>

        <div className={`container ${inactive ? "inactive" : ""}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
