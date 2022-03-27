import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  fetchRole,
  maprole,
  mapThisUserWithROle,
} from "../redux/Actions/RoleAction";

import { fetchUser } from "../redux/Actions/UserActon";

function UserRoleMap() {
  const userInfo = localStorage.getItem("usertoken")
    ? JSON.parse(localStorage.getItem("usertoken"))
    : null;

  const dispatch = useDispatch();
  const rolemap = useSelector((state) => state.rolemapwithuser.success);
  const user = useSelector((state) => state.User.users?.data?.data);
  const role = useSelector((state) => state.roles?.roles?.data?.data);

  const users = [];
  {
    user?.map((item) => users.push({ value: item.id, label: item.name }));
  }

  const roles = [];
  {
    role?.map((item) => roles.push({ value: item.id, label: item.name }));
  }

  const sendrole = () => {
    console.log(selected);
    console.log(selectedValue);

    dispatch(mapThisUserWithROle(selected, selectedValue, userInfo));
  };

  const [selected, setSelected] = useState();
  const [selectedValue, setSelectedValue] = useState();

  useEffect(() => {
    dispatch(fetchUser(userInfo));
    dispatch(fetchRole(userInfo));
  }, []);
  return (
    <div>
      <div className="User-heading">
        <div>
          <span className="heading">User role map</span>
        </div>
      </div>
      <div className="role-select">
        <div className="role-select-1">
          Users:
          <Select
            options={users}
            values={selected}
            onChange={(e) => setSelected(e.value)}
          ></Select>
        </div>
        <div className="role-select-1">
          Their Role map:
          <Select
            // isMulti
            options={roles}
            values={selectedValue}
            onChange={(e) => setSelectedValue(e.value)}
          ></Select>
        </div>
      </div>
      <button className="add-users" onClick={() => sendrole()}>
        Map
      </button>
    </div>
  );
}

export default UserRoleMap;
