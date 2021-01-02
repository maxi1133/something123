import { createStore, combineReducers } from "redux";
import { User } from "./reducer/UserReduser";
import { AdminReducer } from "./createAdminStore";

const PrevLocation = (state = "", action) => {
  switch (action.type) {
    case "SetPrevLocation": {
      return action.payload;
    }
    default:
      return state;
  }
};

let GioHangReducer = (state = [] , action) => {
  switch (action.type) {
    case "AddToGioHang": 
    {
      return action.payload;
    }
    default:
      return state;
  }
}

const root = combineReducers({
  User: User,
  GioHang : GioHangReducer,
  PrevLocation: PrevLocation,
  Admin: AdminReducer,
});

export let store = createStore(root);
