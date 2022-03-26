import { combineReducers } from "redux";
import {
  fetchUserReducer,
  userLoginReducer,
  deleteUserReducer,
  adduserReducer,
} from "./Reducers/UserReducers";
import {
  fetchScreenReducer,
  deleteScreenReducer,
  addscreenReducer,
  screenUpdateReducer,
} from "./Reducers/ScreenReducers";
import {
  addRoleReducer,
  deleteRoleReducer,
  editRoleReducer,
  fetchRoleReducer,
} from "./Reducers/RoleReducers";
import {
  addproductReducer,
  deleteproductReducer,
  fetchProductReducer,
  productUpdateReducer,
} from "./Reducers/ProductReducers";

const rootReducer = combineReducers({
  User: fetchUserReducer,
  adduser: adduserReducer,
  deleteuser: deleteUserReducer,
  userlogin: userLoginReducer,

  roles: fetchRoleReducer,
  addrole: addRoleReducer,
  deleterole: deleteRoleReducer,
  editrole: editRoleReducer,

  screens: fetchScreenReducer,
  addscreen: addscreenReducer,
  deletescreen: deleteScreenReducer,
  updatescreen: screenUpdateReducer,

  products: fetchProductReducer,
  addproducts: addproductReducer,
  deleteproducts: deleteproductReducer,
  editproduct: productUpdateReducer,
});

export default rootReducer;
