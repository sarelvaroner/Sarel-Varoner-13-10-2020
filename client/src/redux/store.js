import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/index";
import rootReducer from "./reducers/index.js";

const sagaMiddleware = createSagaMiddleware();

const store = compose(
  applyMiddleware(sagaMiddleware),
  typeof window === "object" && typeof window.devToolsExtension !== "undefined"
    ? window.devToolsExtension()
    : (f) => f
)(createStore)(rootReducer);

sagaMiddleware.run(rootSaga);

export default store;
