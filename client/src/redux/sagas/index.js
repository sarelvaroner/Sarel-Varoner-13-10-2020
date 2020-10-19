import { all } from 'redux-saga/effects'
import getEmailsSaga from './getEmailsSaga'
import deleteEmailsSaga from './deleteEmailsSaga'
import saveEmailsSaga from './saveEmailsSaga'

export default function* rootSaga() {
  yield all([
    getEmailsSaga(),
    deleteEmailsSaga(),
    saveEmailsSaga()
  ])
}