import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
firebase.initializeApp({
  apiKey: "AIzaSyBqJnb17XCaWvNoxdTElPeeDNruFN5vg9o",
  authDomain: "### FIREBASE AUTH DOMAIN ###",
  projectId: "adam-stock-tacker",
});

var db = firebase.firestore();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
