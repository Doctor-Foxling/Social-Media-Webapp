import { createStore, applyMiddleware } from "react";
import thunk from "redux-thunk";

const middleware = [thunk];

const store = createStore(() => [], {}, applyMiddleware(...middleware));

export default store;
