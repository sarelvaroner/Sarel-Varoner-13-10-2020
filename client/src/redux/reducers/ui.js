import * as type from "../types";

const initialState = {
  isSideBarOpen: false,
  currentSection: "inbox",
  loading: false,
  error: null,
  success: null,
  allowUpdateUser: false
};

export default function ui(state = initialState, action) {
  switch (action.type) {
    case type.TOGGLE_MENU:
      return {
        ...state,
        isSideBarOpen: !state.isSideBarOpen,
      };
    case type.TOGGLE_UPDATE_USER:
      return {
        ...state,
        allowUpdateUser: action.payload,
      };
    case type.SET_CURRENT_SECTION:
      return {
        ...state,
        currentSection: action.payload,
      };
    case type.GET_CURRENT_SECTION:
      return {
        currentSection: state.ui.currentSection,
      };
    case type.SAVE_EMAIL_REQUESTED:
    case type.GET_EMAILS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.SAVE_EMAIL_SUCCESS:
    case type.DELETE_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.message,
      };
    case type.GET_EMAILS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case type.DELETE_EMAIL_FAILED:
    case type.SAVE_EMAIL_FAILED:
    case type.GET_EMAILS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case type.ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case type.CLEAN_ERROR:
      return {
        ...state,
        error: null,
      };
    case type.SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case type.CLOSE_SUCCESS:
      return {
        ...state,
        success: null,
      };
    default:
      return state;
  }
}
