import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import cryptoReducer, { getList } from "./CryptoActions";

const rootReducer = combineReducers({
    crypto: cryptoReducer,
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    );

    getList()(store.dispatch)

    return store;
}