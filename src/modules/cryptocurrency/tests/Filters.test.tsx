import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "../components/Filter";
import { Provider } from "react-redux";
import { Store, applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import cryptoReducer from "../../../redux/CryptoActions";

const rootReducer = combineReducers({
  crypto: cryptoReducer,
});

let store: Store;

beforeEach(() => {
  store = createStore(rootReducer, applyMiddleware(thunk))
});


describe("<Filters/>", () => {
  test("Render filter component", () => {
    render(
      <Provider store={store}>
        <Filter />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText("Filter by currency")

    expect(inputElement).toBeInTheDocument()
  });

  test("Cambios en input", () => {
    render(
      <Provider store={store}>
        <Filter />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText("Filter by currency")
    fireEvent.change(inputElement,
      {
        target: { value: "btc" }
      }
    )
    expect(inputElement).toHaveValue("btc")
  });

  test('Cambio de estado cargando.', () => {
    render(
      <Provider store={store}>
        <Filter />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText("Filter by currency")
    fireEvent.change(inputElement,
      {
        target: { value: "btc" }
      }
    )

    const actions = store.getState()
    expect(actions.crypto.isLoading).toEqual(true)

  })
});
