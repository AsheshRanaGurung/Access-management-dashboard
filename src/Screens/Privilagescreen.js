import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchScreen } from "../redux/Actions/ScreenAction";

function Privilagescreen() {
  //   const [options, setOptions] = useState([]);

  const userInfo = localStorage.getItem("usertoken")
    ? JSON.parse(localStorage.getItem("usertoken"))
    : null;
  const dispatch = useDispatch();
  const screen = useSelector((state) => state.screens?.screens?.data?.data);

  const screens = [];

  {
    screen?.map((item) => screens.push({ value: item.name, label: item.name }));
  }

  const options = [
    { value: "Create", label: "Create" },
    { value: "Update", label: "Update" },
    { value: "Delete", label: "Delete" },
    { value: "Read", label: "Read" },
  ];

  useEffect(() => {
    dispatch(fetchScreen(userInfo));
  }, []);

  return (
    <>
      <div className="User-heading">
        <div>
          <span className="heading">Assign Role to users</span>
        </div>
        <div>
          <button className="add-users">Add Role</button>
        </div>
      </div>
      <div className="role-select">
        <div className="role-select-1">
          <Select options={screens}></Select>
        </div>
        <div className="role-select-1">
          <Select isMulti options={options}></Select>
        </div>
        <button className="add-users">Add</button>
      </div>
    </>
  );
}

export default Privilagescreen;
