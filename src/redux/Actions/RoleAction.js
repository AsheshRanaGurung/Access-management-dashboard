import axios from "axios";
import {
  FETCH_ROLE_DATA,
  FETCH_ROLE_SUCCESS,
  FETCH_ROLE_FAIL,
  ADD_ROLE_DATA,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_FAIL,
  DELETE_ROLE_DATA,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAIL,
  EDIT_ROLE_DATA,
  EDIT_ROLE_SUCCESS,
  EDIT_ROLE_FAIL,
  ROLE_MAP_REQUEST,
  ROLE_MAP_SUCCESS,
  ROLE_MAP_FAIL,
  ROLE_MAP_WITH_USER_REQUEST,
  ROLE_MAP_WITH_USER_SUCCESS,
  ROLE_MAP_WITH_USER_FAIL,
} from "../Constants/RoleConstants";
import { toast } from "react-toastify";

const baseurl = "https://ecom-react-task.herokuapp.com";

export const fetchRole = (userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_ROLE_DATA,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };

    const url = `${baseurl}/roles`;
    const response = await axios.get(url, config);

    dispatch({
      type: FETCH_ROLE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ROLE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const addRole = (name, desc, userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_ROLE_DATA,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };

    const url = `${baseurl}/roles`;
    const data = await axios.post(
      url,
      {
        name: name,
        description: desc,
      },
      config
    );
    console.log(data.data);

    dispatch({
      type: ADD_ROLE_SUCCESS,
      payload: data.data,
    });
    toast("Role added Successfully");
  } catch (error) {
    dispatch({
      type: ADD_ROLE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleterole = (id, userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ROLE_DATA,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };

    const url = `${baseurl}/roles/${id}`;
    const data = await axios.delete(
      url,

      config
    );
    console.log(data.data);

    dispatch({
      type: DELETE_ROLE_SUCCESS,
      payload: data.data,
    });
    toast("Role deleted Successfully");
  } catch (error) {
    dispatch({
      type: DELETE_ROLE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const editrole = (id, name, desc, userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_ROLE_DATA,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };
    const url = `${baseurl}/roles/${id}`;
    const data = await axios.put(
      url,
      {
        name: name,
        description: desc,
      },
      config
    );
    dispatch({
      type: EDIT_ROLE_SUCCESS,
      payload: data.data,
    });
    toast("Role edited Successfully");
  } catch (error) {
    dispatch({
      type: EDIT_ROLE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const mapThisUserWithROle =
  (userId, roleId, userInfo) => async (dispatch) => {
    try {
      dispatch({
        type: ROLE_MAP_WITH_USER_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo}`,
        },
      };
      const url = `${baseurl}/user/role/map`;
      const data = await axios.post(
        url,
        {
          userId: userId,
          roleId: roleId,
        },
        config
      );
      dispatch({
        type: ROLE_MAP_WITH_USER_SUCCESS,
        payload: data,
      });
      toast("Role mapped Successfully");
    } catch (error) {
      dispatch({
        type: ROLE_MAP_WITH_USER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const maprole = (id, screen, crud, userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: ROLE_MAP_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };

    let create = false;
    let update = false;
    let read = false;

    crud.forEach((element) => {
      switch (element) {
        case "create":
          create = true;
          console.log("create true");
          break;
        case "update":
          update = true;
          console.log("update true");

          break;
        case "read":
          read = true;
          console.log("read true");

          break;
      }
    });

    crud.map((task) => task);

    // console.log(crud);

    const url = `${baseurl}/roles/screen/mapping`;
    const response = await axios.post(
      url,
      {
        id: id,
        mapping: {
          [screen]: {
            [crud[0] ? crud[0] : null]: true,
            [crud[1] ? crud[1] : null]: true,
            [crud[2] ? crud[2] : null]: true,
            [crud[3] ? crud[3] : null]: true,

            // [crud[1]]: 1,
            // [crud[2]]: 1,
            // [crud[3]]: 1,
          },
        },
      },
      config
    );
    dispatch({
      type: ROLE_MAP_SUCCESS,
      payload: response,
    });
    toast("Role mapped successfully");
  } catch (error) {
    dispatch({
      type: ROLE_MAP_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
