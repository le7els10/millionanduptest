import { render, screen } from "@testing-library/react";
import { Store, applyMiddleware, combineReducers, createStore } from "redux";
import cryptoReducer from "../../../redux/CryptoActions";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import DetailsPage from "../pages/DetailsPage";
import { BrowserRouter as Router } from "react-router-dom";
import IndexPage from "../pages/IndexPage";

const rootReducer = combineReducers({
    crypto: cryptoReducer,
});

let store: Store;

beforeEach(() => {
    store = createStore(rootReducer, applyMiddleware(thunk))
});

describe("<IndexPage/>", () => {
    test("Render IndexPage component", () => {

        render(
            <Provider store={store}>
                <Router>
                    <IndexPage />
                </Router>
            </Provider>
        );

        const inputElement = screen.getByText("Cryptocurrency test")

        expect(inputElement).toBeInTheDocument()
    });
})

