import axios from "axios";

const cryptoCurrencyApi = axios.create({
  baseURL: "https://api.coinlore.net/api/",
});

export default cryptoCurrencyApi;
