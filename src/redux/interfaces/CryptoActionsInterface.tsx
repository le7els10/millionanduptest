import { ExchangeResponse } from "../../modules/cryptocurrency/interfaces/ExchangeInterface";
import { CoinsDetailsInterface, ListResponse } from "../../modules/cryptocurrency/interfaces/ListInterface";

export interface CryptoActionsInterface {
    list: ListResponse[]
    exchanges: ExchangeResponse[]
    isLoading: Boolean
    coinDetails: CoinsDetailsInterface

}