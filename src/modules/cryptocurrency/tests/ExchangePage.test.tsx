import { render, screen } from "@testing-library/react";
import { Store, applyMiddleware, combineReducers, createStore } from "redux";
import cryptoReducer from "../../../redux/CryptoActions";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ExchangePage from "../pages/ExchangePage";

const rootReducer = combineReducers({
    crypto: cryptoReducer,
});

let store: Store;

beforeEach(() => {
    store = createStore(rootReducer, applyMiddleware(thunk))
});

describe("<ExchangePage/>", () => {
    test("Render ExchangePage component", () => {

        render(
            <Provider store={store}>
                <Router>
                    <ExchangePage />
                </Router>
            </Provider>
        );

        const inputElement = screen.getByText("Exchanges in USD")

        expect(inputElement).toBeInTheDocument()
    });

    test("No mostrar nada al renderizar Exchanges cargados.", () => {

        render(
            <Provider store={store}>
                <Router>
                    <ExchangePage />
                </Router>
            </Provider>
        );

        const inputElement = screen.getByText("No existen valores relacionados")

        expect(inputElement).toBeInTheDocument()
    });

})

