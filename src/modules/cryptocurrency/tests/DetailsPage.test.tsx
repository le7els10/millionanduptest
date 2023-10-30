import { render, screen } from "@testing-library/react";
import { Store, applyMiddleware, combineReducers, createStore } from "redux";
import cryptoReducer from "../../../redux/CryptoActions";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import DetailsPage from "../pages/DetailsPage";
import { BrowserRouter as Router } from "react-router-dom";

const rootReducer = combineReducers({
    crypto: cryptoReducer,
});

let store: Store;

beforeEach(() => {
    store = createStore(rootReducer, applyMiddleware(thunk))
});

describe("<DetailsPage/>", () => {
    test("Render DetailsPage component", () => {

        render(
            <Provider store={store}>
                <Router>
                    <DetailsPage />
                </Router>
            </Provider>
        );

        const inputElement = screen.getByText("Details")

        expect(inputElement).toBeInTheDocument()
    });

    test("Renderizar detalles cargados.", () => {

        render(
            <Provider store={store}>
                <Router>
                    <DetailsPage />
                </Router>
            </Provider>
        );

        const inputElement = screen.getByText("Rank")

        expect(inputElement).toBeInTheDocument()
    });
})

