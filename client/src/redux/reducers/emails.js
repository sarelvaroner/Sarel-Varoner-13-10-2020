import { removeItem } from "../../utils";
import * as type from "../types";

const initialState = {
  emails: [],
  selectedEmail: null,
  skip:0,
};

export default function emails(state = initialState, action) {
  switch (action.type) {
    case type.GET_EMAILS_SUCCESS:
      return {
        ...state,
        emails: action.payload,
      };

    case type.SET_SELECTED_EMAIL:
      return {
        ...state,
        selectedEmail: action.payload,
      };

    case type.DELETE_EMAIL_SUCCESS:
      return {
        ...state,
        emails: [...removeItem(state.emails, action.payload.id)],
      };

    case type.SAVE_EMAIL_SUCCESS:
      return {
        ...state,
        emails: [...state.emails, action.payload.email],
      };

    default:
      return state;
  }
}
