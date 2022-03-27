import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SideMenu from "./components/SideMenu";
import HomeScreen from "./Screens/HomeScreen";
import CreateUser from "./Screens/CreateUser";
import Content from "./Screens/Content";
import RoleSetting from "./Screens/RoleSetting";
import Screensetup from "./Screens/Screensetup";
import Modal from "react-modal";
import UserSetting from "./Screens/UserSetting";
import Login from "./Screens/Login";
import Dashboard from "./Screens/Dashboard";
import Privilagescreen from "./Screens/Privilagescreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserRoleMap from "./Screens/UserRoleMap";
Modal.setAppElement("#root");

function App() {
  // const [inactive, setInactive] = useState(false);

  // const userInfo = localStorage.getItem("usertoken")
  //   ? JSON.parse(localStorage.getItem("usertoken"))
  //   : null;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
      />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Dashboard />}>
          <Route path="homescreen" element={<HomeScreen />}></Route>
          <Route path="usersetting" element={<UserSetting />} />
          <Route path="createuser" element={<CreateUser />} />
          <Route path="rolesetting" element={<RoleSetting />} />
          <Route path="screensetup" element={<Screensetup />} />
          <Route path="userrolesetup" element={<UserRoleMap />} />
          <Route path="privelagesetup/:id" element={<Privilagescreen />} />
          <Route path="contents" element={<Content />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
