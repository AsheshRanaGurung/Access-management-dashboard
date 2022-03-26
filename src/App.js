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
import { fetchUser, userLogin } from "./redux/Actions/UserActon";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./Screens/Dashboard";
import Privilagescreen from "./Screens/Privilagescreen";
Modal.setAppElement("#root");

function App() {
  const [inactive, setInactive] = useState(false);

  const userInfo = localStorage.getItem("usertoken")
    ? JSON.parse(localStorage.getItem("usertoken"))
    : null;

  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<Dashboard />}>
        <Route path="homescreen" element={<HomeScreen />}></Route>
        <Route path="usersetting" element={<UserSetting />} />
        <Route path="createuser" element={<CreateUser />} />
        <Route path="rolesetting" element={<RoleSetting />} />
        <Route path="screensetup" element={<Screensetup />} />
        <Route path="privelagesetup/:id" element={<Privilagescreen />} />
        <Route path="contents" element={<Content />} />
      </Route>
    </Routes>
  );
}

export default App;

// {/* <div className="App">
// {/* {userInfo ? ( */}
// <div className="flex-container">
//   {/* <div
//     className={` ${inactive ? "flex-child1 inactive" : "flex-child1"}`}
//   >
//     <SideMenu
//       onCollapse={(inactive) => {
//         console.log(inactive);
//         setInactive(inactive);
//       }}
//     />
//   </div> */}

//   <div className={`container ${inactive ? "inactive" : ""}`}>
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/dashboard" element={<Dashboard />}>
//         {/* <Route path="/" element={<HomeScreen />}></Route> */}
//         <Route path="usersetting" element={<UserSetting />} />
//         <Route path="createuser" element={<CreateUser />} />
//         <Route path="rolesetting" element={<RoleSetting />} />
//         <Route path="screensetup" element={<Screensetup />} />
//         <Route path="contents" element={<Content />} />
//       </Route>
//     </Routes>
//   </div>
// </div>
// {/* // ) : ( // <Login />
// // */}
// </div> */}
