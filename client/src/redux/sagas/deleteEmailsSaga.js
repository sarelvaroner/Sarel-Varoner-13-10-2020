import { call, put, takeEvery, select } from "redux-saga/effects";
import * as type from "../types";
import { API_URI } from "../../const";

const getApiParams = (state) => ({
  user: state.user.currentUser,
});

async function deleteEmailRequest({ user, id }) {
  try {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
    };

    const response = await fetch(`${API_URI}/email/${id}`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        throw new Error("cannot delete email");
      }
      const error = (data && data.message) || response.statusText;
      throw new Error(error);
    }
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
}

function* deleteEmail({ payload }) {
  try {
    const apiParams = yield select(getApiParams);
    const email = yield call(deleteEmailRequest, {
      ...apiParams,
      id: payload,
    });

    const message = "email deleted successfully";
    yield put({
      type: type.DELETE_EMAIL_SUCCESS,
      payload: { id: email.id, message },
    });
  } catch (e) {
    yield put({
      type: type.SAVE_EMAIL_FAILED,
      payload: e.message,
    });
  }
}

function* deleteEmailsSaga() {
  yield takeEvery(type.DELETE_EMAIL_REQUESTED, deleteEmail);
}

export default deleteEmailsSaga;
