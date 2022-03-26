import {
  FETCH_USER_DATA,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  USER_lOGIN,
  USER_lOGIN_SUCCESS,
  USER_lOGIN_FAIL,
  ADD_USER_DATA,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  DELETE_USER_DATA,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../Constants/UsersConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_lOGIN:
      return { loading: true, userInfo: "" };

    case USER_lOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_lOGIN_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const fetchUserReducer = (
  state = { users: [], isloading: true },
  action
) => {
  switch (action.type) {
    case FETCH_USER_DATA:
      return {
        ...state,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
        isloading: false,
      };
    case FETCH_USER_FAIL:
      return { isloading: false, error: action.payload };
    default:
      return state;
  }
};

export const adduserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_USER_DATA:
      return { isloading: true };

    case ADD_USER_SUCCESS:
      return { isloading: false, success: true };

    case ADD_USER_FAIL:
      return { isloading: false, error: action.payload };

    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_DATA:
      return { loading: true };

    case DELETE_USER_SUCCESS:
      return { loading: false, success: true };

    case DELETE_USER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
