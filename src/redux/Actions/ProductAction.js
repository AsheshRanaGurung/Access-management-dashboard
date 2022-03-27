import axios from "axios";
import {
  FETCH_PRODUCT_DATA,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
  ADD_PRODUCT_DATA,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  DELETE_PRODUCT_DATA,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  EDIT_PRODUCT_DATA,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
} from "../Constants/ProductConstants";
import { toast } from "react-toastify";

const baseurl = "https://ecom-react-task.herokuapp.com";

export const fetchProduct = (userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_PRODUCT_DATA,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };

    const url = `${baseurl}/product`;
    const response = await axios.get(
      url,

      config
    );

    dispatch({
      type: FETCH_PRODUCT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const addProduct =
  (name, desc, qty, img, userInfo) => async (dispatch) => {
    try {
      dispatch({
        type: ADD_PRODUCT_DATA,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo}`,
        },
      };

      const url = `${baseurl}/product`;
      const response = await axios.post(
        url,
        {
          name: name,
          description: desc,
          image: img,
          quantity: qty,
          // name: "Dell Laptop",
          // description: "Dell Laptop",
          // image: "https://betanews.com/wp-content/uploads/2014/11/front.jpg",
          // quantity: 10,
        },
        config
      );

      dispatch({
        type: ADD_PRODUCT_SUCCESS,
        payload: response,
      });
      toast("Product added Successfully");
    } catch (error) {
      dispatch({
        type: ADD_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const deleteproduct = (id, userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_DATA,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };
    const url = `${baseurl}/product/${id}`;
    const data = await axios.delete(url, config);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data,
    });
    toast("Product deleted Successfully");
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const editproduct =
  (id, name, desc, qty, img, userInfo) => async (dispatch) => {
    try {
      dispatch({
        type: EDIT_PRODUCT_DATA,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo}`,
        },
      };
      const url = `${baseurl}/product/${id}`;
      const data = await axios.put(
        url,
        {
          name: name,
          description: desc,
          image: img,
          quantity: qty,
        },
        config
      );
      dispatch({
        type: EDIT_PRODUCT_SUCCESS,
        payload: data,
      });
      toast("Product edited Successfully");
    } catch (error) {
      dispatch({
        type: EDIT_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
