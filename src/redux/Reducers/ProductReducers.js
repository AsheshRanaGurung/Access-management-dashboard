import {
  FETCH_PRODUCT_DATA,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
  ADD_PRODUCT_DATA,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  EDIT_PRODUCT_DATA,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  DELETE_PRODUCT_DATA,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from "../Constants/ProductConstants";

export const fetchProductReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case FETCH_PRODUCT_DATA:
      return {
        ...state,
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: [action.payload],
      };
    case FETCH_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const addproductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_DATA:
      return { isloading: true };

    case ADD_PRODUCT_SUCCESS:
      return { isloading: false, success: true };

    case ADD_PRODUCT_FAIL:
      return { isloading: false, error: action.payload };

    default:
      return state;
  }
};

export const deleteproductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_DATA:
      return { isloading: true };

    case DELETE_PRODUCT_SUCCESS:
      return { isloading: false, success: true };

    case DELETE_PRODUCT_FAIL:
      return { isloading: false, error: action.payload };

    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PRODUCT_DATA:
      return { loading: true };

    case EDIT_PRODUCT_SUCCESS:
      return { loading: false, success: true };

    case EDIT_PRODUCT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
