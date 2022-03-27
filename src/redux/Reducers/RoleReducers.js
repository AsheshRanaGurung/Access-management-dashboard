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
  ROLE_MAP_WITH_USER_REQUEST,
  ROLE_MAP_WITH_USER_SUCCESS,
  ROLE_MAP_WITH_USER_FAIL,
} from "../Constants/RoleConstants";

export const fetchRoleReducer = (
  state = { roles: [], isloading: true },
  action
) => {
  switch (action.type) {
    case FETCH_ROLE_DATA:
      return {
        ...state,
      };
    case FETCH_ROLE_SUCCESS:
      return {
        ...state,
        roles: action.payload,
        isloading: false,
      };
    case FETCH_ROLE_FAIL:
      return { isloading: false, error: action.payload };
    default:
      return state;
  }
};

export const addRoleReducer = (state = { isloading: true }, action) => {
  switch (action.type) {
    case ADD_ROLE_DATA:
      return {
        ...state,
      };
    case ADD_ROLE_SUCCESS:
      return {
        isloading: false,
        success: true,
      };
    case ADD_ROLE_FAIL:
      return { isloading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ROLE_DATA:
      return { loading: true };

    case DELETE_ROLE_SUCCESS:
      return { loading: false, success: true };

    case DELETE_ROLE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const editRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_ROLE_DATA:
      return { loading: true };

    case EDIT_ROLE_SUCCESS:
      return { loading: false, success: true };

    case EDIT_ROLE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const roleMapWIthUseReducer = (state = {}, action) => {
  switch (action.type) {
    case ROLE_MAP_WITH_USER_REQUEST:
      return { loading: true };

    case ROLE_MAP_WITH_USER_SUCCESS:
      return { loading: false, success: true };

    case ROLE_MAP_WITH_USER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
