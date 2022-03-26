import {
  FETCH_SCREEN_DATA,
  FETCH_SCREEN_SUCCESS,
  FETCH_SCREEN_FAIL,
  ADD_NEW_SCREEN,
  SCREEN_ADD_SUCCESS,
  SCREEN_ADD_FAIL,
  DELETE_SCREEN_REQUEST,
  DELETE_SCREEN_SUCCESS,
  DELETE_SCREEN_FAIL,
  UPDATE_SCREEN_REQUEST,
  UPDATE_SCREEN_SUCCESS,
  UPDATE_SCREEN_FAIL,
} from "../Constants/ScreenConstants";

export const fetchScreenReducer = (
  state = { screens: [], isloading: true },
  action
) => {
  switch (action.type) {
    case FETCH_SCREEN_DATA:
      return {
        ...state,
      };
    case FETCH_SCREEN_SUCCESS:
      return {
        ...state,
        screens: action.payload,
        isloading: false,
      };
    case FETCH_SCREEN_FAIL:
      return { isloading: false, error: action.payload };
    default:
      return state;
  }
};

export const addscreenReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_SCREEN:
      return { isloading: true };

    case SCREEN_ADD_SUCCESS:
      return { isloading: false, success: true };

    case SCREEN_ADD_FAIL:
      return { isloading: false, error: action.payload };

    default:
      return state;
  }
};

export const deleteScreenReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SCREEN_REQUEST:
      return { loading: true };

    case DELETE_SCREEN_SUCCESS:
      return { loading: false, success: true };

    case DELETE_SCREEN_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const screenUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SCREEN_REQUEST:
      return { loading: true };

    case UPDATE_SCREEN_SUCCESS:
      return { loading: false, success: true };

    case UPDATE_SCREEN_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
