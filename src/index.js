import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom'
import { createStore } from "redux";
import reducers from "./reducers";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

render(
  <BrowserRouter>
    <Provider store={createStore(reducers)}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
