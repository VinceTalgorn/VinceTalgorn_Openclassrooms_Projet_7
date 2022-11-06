//On importe les différentes fonctionnalités de React et les actions
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { getUsers } from "./actions/users.actions";
import { getPosts } from "./actions/post.actions";
import logger from "redux-logger";

//On créer la root principale
const root = ReactDOM.createRoot(document.getElementById("root"));

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk, logger],
});

store.dispatch(getUsers());
store.dispatch(getPosts());

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
