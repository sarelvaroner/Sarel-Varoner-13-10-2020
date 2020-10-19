import { call, put, takeEvery, select } from "redux-saga/effects";
import * as type from "../types";
import { API_URI } from "../../const";

const getApiParams = (state) => ({
  user: state.user.currentUser,
});

async function saveEmailRequest({ user, email }) {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
      body: JSON.stringify(email),
    };

    const response = await fetch(`${API_URI}/email`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        throw new Error("cannot save email");
      }
      const error = (data && data.message) || response.statusText;
      throw new Error(error);
    }
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
}

function* saveEmail({ payload }) {
  try {
    const apiParams = yield select(getApiParams);
    const email = yield call(saveEmailRequest, {
      ...apiParams,
      email: payload,
    });
    const message = "Email saves successfully";
    yield put({ type: type.SAVE_EMAIL_SUCCESS, payload: { email, message } });
  } catch (e) {
    yield put({ type: type.SAVE_EMAIL_FAILED, payload: e.message });
  }
}

function* saveEmailsSaga() {
  yield takeEvery(type.SAVE_EMAIL_REQUESTED, saveEmail);
}

export default saveEmailsSaga;
