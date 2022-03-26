import {
  FETCH_USER_DATA,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  ADD_USER_DATA,
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  USER_lOGIN,
  USER_lOGIN_SUCCESS,
  USER_lOGIN_FAIL,
  DELETE_USER_DATA,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../Constants/UsersConstants";
import axios from "axios";

export const userLogin = (email, pass) => async (dispatch) => {
  try {
    dispatch({
      type: USER_lOGIN,
    });
    const config = {
      headers: {},
    };
    const { data } = await axios.post(
      "https://ecom-react-task.herokuapp.com/auth/login",
      { email: email, password: pass },
      config
    );
    dispatch({
      type: USER_lOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("usertoken", JSON.stringify(data.data.token));
  } catch (error) {
    dispatch({
      type: USER_lOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const fetchUser = (userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_USER_DATA,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };

    const url = "https://ecom-react-task.herokuapp.com/user";
    const response = await axios.get(url, config);

    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adduser = (name, email, pass, userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_USER_DATA,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };
    const url = "https://ecom-react-task.herokuapp.com/user";
    const data = await axios.post(
      url,
      {
        name: name,
        email: email,
        password: pass,
      },
      config
    );
    dispatch({
      type: ADD_USER_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_USER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteuser = (id, userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_USER_DATA,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };

    const url = `https://ecom-react-task.herokuapp.com/user/${id}`;

    const { data } = await axios.delete(url, config);
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const edituser =
  (id, name, email, pass, userInfo) => async (dispatch) => {
    try {
      dispatch({
        type: ADD_USER_DATA,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo}`,
        },
      };
      const url = `https://ecom-react-task.herokuapp.com/user/${id}`;
      const data = await axios.put(
        url,
        {
          name: name,
          email: email,
          password: pass,
        },
        config
      );
      dispatch({
        type: ADD_USER_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: ADD_USER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
