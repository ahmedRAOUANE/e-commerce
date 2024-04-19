import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

// styles
import "./styles/button.css";
import "./styles/index.css";
import "./styles/card.css";


// components
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter >
        <App />
      </HashRouter >
    </Provider>
  </React.StrictMode>
);
