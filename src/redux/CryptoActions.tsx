import { Dispatch } from "redux";
import cryptoCurrencyApi from "../api/CryptoCurrencyApi";
import cryptoRoutes from "../api/CryptoRoutes";

const initialData = {
    list: [],
    exchanges: [],
    coinDetails: null,
    exchangeDetails: null,
    isLoading: true
};

//TYPES
const GET_LIST_SUCCESS = "GET_LIST_SUCCESS";
const GET_EXCHANGE_SUCCESS = "GET_EXCHANGE_SUCCESS";
const GET_COIN_DETAILS_SUCCESS = "GET_COIN_DETAILS_SUCCESS";
const GET_EXCHANGE_DETAILS_SUCCESS = "GET_EXCHANGE_DETAILS_SUCCESS";

//REDUCER
export default function cryptoReducer(state = initialData, action: any) {
    switch (action.type) {
        case GET_LIST_SUCCESS:
            return {
                ...state,
                list: action.payload,
            };

        case GET_EXCHANGE_SUCCESS:
            return {
                ...state,
                exchanges: action.payload,
            };

        case GET_COIN_DETAILS_SUCCESS:
            return {
                ...state,
                coinDetails: action.payload,
            };

        case GET_EXCHANGE_DETAILS_SUCCESS:
            return {
                ...state,
                exchangeDetails: action.payload,
            };


        default:
            return state;
    }
}

//ACTIONS
//OPERATIONS
/**
 * @method getList
 * @description Obtener Lista de currencys
 * @return {void}
 */
export const getList = () => async (dispatch: Dispatch) => {
    try {

        const req = await cryptoCurrencyApi.get(cryptoRoutes.LIST_ROUTE)

        dispatch({
            type: GET_LIST_SUCCESS,
            payload: req.data.data,
        });
    } catch (error) {
        console.log("Error al obtener lista de coins");
    }
};

/**
 * @method getExchanges
 * @description Obtener Lista de exchanges filtrado por coin
 * @param {string} coin currency 
 * @return {void}
 */
export const getExchanges = (coin: string) => async (dispatch: Dispatch) => {
    try {

        const req = await cryptoCurrencyApi.get(`${cryptoRoutes.EXCHANGE_ROUTE}/?id=${coin}`)

        dispatch({
            type: GET_EXCHANGE_SUCCESS,
            payload: req.data,
        });
    } catch (error) {
        console.log("Error al obtener lista de exchanges");
    }
};

/**
 * @method getCoinDetails
 * @description Obtener detalles del coin seleccionado
 * @param {string} coin currency 
 * @return {void}
 */
export const getCoinDetails = (coin: string) => async (dispatch: Dispatch) => {
    try {

        const req = await cryptoCurrencyApi.get(`${cryptoRoutes.COIN_DETAILS_ROUTE}/?id=${coin}`)

        dispatch({
            type: GET_COIN_DETAILS_SUCCESS,
            payload: req.data[0],
        });
    } catch (error) {
        console.log("Error al obtener detalles de coin");
    }
};


