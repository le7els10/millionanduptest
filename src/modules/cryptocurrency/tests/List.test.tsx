import { render, screen } from "@testing-library/react";
import { Store, applyMiddleware, combineReducers, createStore } from "redux";
import cryptoReducer from "../../../redux/CryptoActions";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import List from "../components/List";

const rootReducer = combineReducers({
    crypto: cryptoReducer,
});

let store: Store;

beforeEach(() => {
    store = createStore(rootReducer, applyMiddleware(thunk))
});

jest.mock('react-router-dom', () => ({
    useNavigate: () => () => { }, // Devolver una función vacía
}));

describe("<List/>", () => {


    test("Listar array vacío", async () => {
        render(
            <Provider store={store}>
                <List list={[]} type="currency" />
            </Provider>
        );

        const element = await screen.findByText("No existen valores relacionados")

        expect(element).toBeInTheDocument()
    });

    test("Mostrar botón 'detalles' cuando el tipo es 'currency'", async () => {
        const list = [
            { id: '0', name: 'BingX', symbol: 'ETH', price_usd: '1793.79', showExchanges: false },
            { id: '1', name: 'Binance', symbol: 'ETH', price_usd: '1793.83', showExchanges: false }
        ]
        render(
            <Provider store={store}>
                <List list={list} type="currency" />
            </Provider>
        );

        list.forEach(async (item) => {
            const itemElement = await screen.findByText("Detalles")
            expect(itemElement).toBeInTheDocument()
        })

    });


    test("No mostrar botón 'detalles' cuando el tipo es 'exchanges'", async () => {
        const list = [
            { id: '0', name: 'BingX', symbol: 'ETH', price_usd: '1793.79', showExchanges: false },
            { id: '1', name: 'Binance', symbol: 'ETH', price_usd: '1793.83', showExchanges: false }
        ]
        render(
            <Provider store={store}>
                <List list={list} type="exchanges" />
            </Provider>
        );

        list.forEach(async (item) => {
            const itemElement = await screen.findByText("Detalles")
            expect(itemElement).toBeInTheDocument()
        })

    });

})