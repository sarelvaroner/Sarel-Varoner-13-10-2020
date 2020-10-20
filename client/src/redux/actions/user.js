import * as type from "../types";

export function setCurrentUser(payload) {
  return {
    type: type.SET_CURRENT_USER,
    payload
  };
}
