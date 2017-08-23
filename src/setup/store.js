import { createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
import reducers from "../reducers";
import { routerMiddleware } from "react-router-redux";

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
