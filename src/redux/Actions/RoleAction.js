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
} from "../Constants/RoleConstants";

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

    const url = "https://ecom-react-task.herokuapp.com/roles";
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

    const url = "https://ecom-react-task.herokuapp.com/roles";
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

    const url = `https://ecom-react-task.herokuapp.com/roles/${id}`;
    const data = await axios.delete(
      url,

      config
    );
    console.log(data.data);

    dispatch({
      type: DELETE_ROLE_SUCCESS,
      payload: data.data,
    });
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
    const url = `https://ecom-react-task.herokuapp.com/roles/${id}`;
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
