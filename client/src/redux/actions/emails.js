import * as type from "../types";

export function setSelectedEmail(email) {
  return {
    type: type.SET_SELECTED_EMAIL,
    payload: email,
  };
}

export function getEmails(skip, limit) {
  return {
    type: type.GET_EMAILS_REQUESTED,
    payload: { skip, limit },
  };
}
export function getEmailsFail(message) {
  return {
    type: type.GET_EMAILS_FAILED,
    payload: message,
  };
}

export function deleteEmail(id) {
  return {
    type: type.DELETE_EMAIL_REQUESTED,
    payload: id,
  };
}

export function saveEmail(email) {
  return {
    type: type.SAVE_EMAIL_REQUESTED,
    payload: email,
  };
}

export function saveEmailFail(message) {
  return {
    type: type.SAVE_EMAIL_FAILED,
    payload: message,
  };
}
export function setSkip(skip) {
  return {
    type: type.SET_SKIP,
    payload: skip,
  };
}
