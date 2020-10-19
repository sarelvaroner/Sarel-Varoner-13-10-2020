import * as type from "../types";

const initialState = {
  currentUser: '',
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case type.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}
