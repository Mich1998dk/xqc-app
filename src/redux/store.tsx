import { createStore, applyMiddleware } from "redux";
import { devicesReducer } from "./reducers";
import thunk from "redux-thunk";

export const store = createStore(devicesReducer, applyMiddleware(thunk));
