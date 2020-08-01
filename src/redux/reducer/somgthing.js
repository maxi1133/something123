const State = {
  GioHang: [],
};

export const somethingReducer = (state = State, action) => {
  switch (action.type) {
    case "lan1": {
      let temp = [...state.GioHang];
      temp.push(action.payload);
      return {
        ...state,
        GioHang: temp,
      };
    }

    case "delete": {
      return {
        ...state,
        GioHang: [],
      };
    }

    default: {
      return state
    }
  }
};

export const A2 = (state = [], action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
