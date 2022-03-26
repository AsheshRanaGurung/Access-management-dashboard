import axios from "axios";
import {
  FETCH_SCREEN_DATA,
  FETCH_SCREEN_SUCCESS,
  FETCH_SCREEN_FAIL,
  ADD_NEW_SCREEN,
  SCREEN_ADD_SUCCESS,
  SCREEN_ADD_FAIL,
  UPDATE_SCREEN_REQUEST,
  UPDATE_SCREEN_SUCCESS,
  UPDATE_SCREEN_FAIL,
  DELETE_SCREEN_REQUEST,
  DELETE_SCREEN_SUCCESS,
  DELETE_SCREEN_FAIL,
} from "../Constants/ScreenConstants";

export const fetchScreen = (userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_SCREEN_DATA,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };
    const url = "https://ecom-react-task.herokuapp.com/screens";

    const response = await axios.get(url, config);

    dispatch({
      type: FETCH_SCREEN_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SCREEN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const addscreen = (name, desc, userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_NEW_SCREEN,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };

    const url = "https://ecom-react-task.herokuapp.com/screens";

    const { data } = await axios.post(
      url,
      { name: name, description: desc },
      config
    );
    console.log(data);

    dispatch({
      type: SCREEN_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCREEN_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deletescreen = (id, userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_SCREEN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };
    const url = `https://ecom-react-task.herokuapp.com/screens/${id}`;

    const { data } = await axios.delete(
      url,

      config
    );
    console.log(data);

    dispatch({
      type: DELETE_SCREEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SCREEN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const editscreen = (id, name, desc, userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_SCREEN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };

    const url = `https://ecom-react-task.herokuapp.com/screens/${id}`;

    const { data } = await axios.put(
      url,
      { name: name, description: desc },
      config
    );
    console.log(data);

    dispatch({
      type: UPDATE_SCREEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SCREEN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
