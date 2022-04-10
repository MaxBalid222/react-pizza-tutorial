import { createStore, compose, applyMiddleware } from "redux";
import think from "redux-thunk"
import rootReducer from "./reducers"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(think))
)

export default store