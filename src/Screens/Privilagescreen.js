import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchScreen } from "../redux/Actions/ScreenAction";
import { Formik, Field, FieldArray } from "formik";
import { maprole } from "../redux/Actions/RoleAction";
import { useParams } from "react-router-dom";

function Privilagescreen() {
  //   const [options, setOptions] = useState([]);
  const { id } = useParams();

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
    { value: "create", label: "create" },
    { value: "update", label: "update" },
    { value: "delete", label: "delete" },
    { value: "read", label: "read" },
  ];

  const sendrole = () => {
    // console.log("screen is: " + selected);
    // console.log("CRUD is :" + selectedValue);
    // console.log("CRUD is :" + selectedValue);

    dispatch(maprole(id, selected, selectedValue, userInfo));
  };

  const [selected, setSelected] = useState();
  const [selectedValue, setSelectedValue] = useState([]);

  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
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
          <Select
            options={screens}
            values={selected}
            onChange={(e) => setSelected(e.value)}
          ></Select>
          {selected}
        </div>
        <div className="role-select-1">
          <Select
            isMulti
            options={options}
            value={options.filter((obj) => selectedValue.includes(obj.value))}
            onChange={handleChange}
          ></Select>
        </div>
        <button className="add-users" onClick={() => sendrole()}>
          Add
        </button>
      </div>
    </>
  );
}

export default Privilagescreen;
