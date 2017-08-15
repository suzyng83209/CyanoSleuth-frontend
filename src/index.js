import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

render(
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
