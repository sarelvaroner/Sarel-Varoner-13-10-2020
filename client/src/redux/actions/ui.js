import * as type from "../types";

export function toggleMenu() {
  return {
    type: type.TOGGLE_MENU,
  };
}
export function setUpdateUser(allow) {
  return {
    type: type.TOGGLE_UPDATE_USER,
    payload: allow
  };
}

export function setSection(payload) {
  return {
    type: type.SET_CURRENT_SECTION,
    payload,
  };
}

export function getSection() {
  return {
    type: type.GET_CURRENT_SECTION,
  };
}
export function cleanError() {
  return {
    type: type.CLEAN_ERROR,
  };
}
export function loginError(message) {
  return {
    type: type.ERROR,
    payload: message
  };
}

export function successMessage(message) {
  return {
    type: type.SUCCESS,
    payload: message
  };
}

export function closeSuccessMessage() {
  return {
    type: type.CLOSE_SUCCESS,
  };
}
