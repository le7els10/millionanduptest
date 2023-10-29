export interface ExchangeResponse {
    name: string;
    base: Base;
    quote: string;
    price: number;
    price_usd: number;
    volume: number;
    volume_usd: number;
    time: number;
}

export enum Base {
    Bch = "BCH",
    Btc = "BTC",
    Etc = "ETC",
    Eth = "ETH",
    Ltc = "LTC",
    Trx = "TRX",
    Zec = "ZEC",
}
