import { call, put, takeLatest, select } from "redux-saga/effects";
import * as type from "../types";
import { API_URI } from "../../const";

const getApiParams = (state) => ({
  user: state.user.currentUser,
  section: state.ui.currentSection,
  skip: state.emails.skip
});

async function getEmails({ user, section, skip }) {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
    };
    
    const response = await fetch(
      `${API_URI}/emails/${section}?skip=${skip}`,
      requestOptions
    );
    const data = await response.json();

    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        throw new Error("cannot get emails");
      }
      const error = (data && data.message) || response.statusText;
      throw new Error(error);
    }
    return data;
  } catch (e) {
    put({ type: type.ERROR, payload: e.message });
    throw new Error(e.message);
  }
}

function* fetchEmails() {
  try {
    const apiParams = yield select(getApiParams);
    const emails = yield call(getEmails, apiParams);

    yield put({ type: type.GET_EMAILS_SUCCESS, payload: emails });
  } catch (e) {
    yield put({ type: type.GET_EMAILS_FAILED, payload: e.message });
  }
}

function* getEmailsSaga() {
  yield takeLatest(type.GET_EMAILS_REQUESTED, fetchEmails);
}

export default getEmailsSaga;
