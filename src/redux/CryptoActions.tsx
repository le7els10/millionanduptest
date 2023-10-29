import { Dispatch } from "redux";
import cryptoCurrencyApi from "../api/CryptoCurrencyApi";
import cryptoRoutes from "../api/CryptoRoutes";
import { ListResponse } from '../modules/cryptocurrency/interfaces/ListInterface';

const initialData = {
    list: [],
    exchanges: [],
    coinDetails: null,
    isLoading: false,
    search: "",
    listFiltered: []
};

//TYPES
const GET_LIST_SUCCESS = "GET_LIST_SUCCESS";
const SET_LIST_FILTERED_SUCCESS = "SET_LIST_FILTERED_SUCCESS";
const GET_EXCHANGE_SUCCESS = "GET_EXCHANGE_SUCCESS";
const GET_COIN_DETAILS_SUCCESS = "GET_COIN_DETAILS_SUCCESS";
const SET_LOADING_SUCCESS = "SET_LOADING_SUCCESS";

//REDUCER
export default function cryptoReducer(state = initialData, action: any) {
    switch (action.type) {
        case GET_LIST_SUCCESS:
            return {
                ...state,
                list: action.payload,
                listFiltered: action.payload
            };

        case GET_EXCHANGE_SUCCESS:
            return {
                ...state,
                exchanges: action.payload.data,
                isLoading: action.payload.loading
            };

        case GET_COIN_DETAILS_SUCCESS:
            return {
                ...state,
                coinDetails: action.payload.data,
                isLoading: action.payload.loading
            };

        case SET_LOADING_SUCCESS:
            return {
                ...state,
                isLoading: action.payload,
            };

        case SET_LIST_FILTERED_SUCCESS:
            return {
                ...state,
                listFiltered: action.payload.list,
                search: action.payload.search,
                isLoading: action.payload.loading
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
        let toReturn = req.data

        if (toReturn.data) {
            toReturn = toReturn.data
        } else {
            toReturn = []
        }

        dispatch({
            type: GET_LIST_SUCCESS,
            payload: toReturn,
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
            payload: { data: req.data, loading: false },
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
            payload: { data: req.data[0], loading: false },
        });
    } catch (error) {
        console.log("Error al obtener detalles de coin");
    }
};

/**
 * @method triggerFilter
 * @description Setear string a buscar entre currencys
 * @param {string} search search 
 * @return {void}
 */
export const triggerFilter = (search: string, originalList: ListResponse[]) => (dispatch: Dispatch) => {

    let newList = originalList.filter((coin) => {
        let lowerName = coin.name.toLowerCase(),
            lowerSymbol = coin.symbol.toLowerCase(),
            lowerSearch = search.toLowerCase()

        if (lowerName.includes(lowerSearch) || lowerSymbol.includes(lowerSearch)) {
            return coin
        }
    })

    dispatch({
        type: SET_LIST_FILTERED_SUCCESS,
        payload: { search, list: newList, loading: false },
    });
};

/**
 * @method setLoading
 * @description Setear bandera de loading
 * @param {boolean} isLoading isLoading 
 * @return {void}
 */
export const setLoading = (isLoading: boolean) => (dispatch: Dispatch) => {
    dispatch({
        type: SET_LOADING_SUCCESS,
        payload: isLoading,
    });

};



