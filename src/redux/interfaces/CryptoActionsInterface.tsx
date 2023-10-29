import { ExchangeResponse } from "../../modules/cryptocurrency/interfaces/ExchangeInterface";
import { CoinsDetailsInterface, ListResponse } from '../../modules/cryptocurrency/interfaces/ListInterface';

export interface CryptoActionsInterface {
    list: ListResponse[]
    listFiltered: ListResponse[]
    exchanges: ExchangeResponse[]
    isLoading: Boolean
    coinDetails: CoinsDetailsInterface
    search: string

}