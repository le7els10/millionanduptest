/* 
Components 
*/
import List from "../components/List"

/* 
Interfaces 
*/
import { ListResponse, ListToShow } from "../interfaces/ListInterface";
import { StoreInterface } from "../../../redux/interfaces/StoreInterface";

/* 
  React 
*/
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import Filter from "../components/Filter";


/**
 * @method buildTable
 * @description Obtener estructura legible para componente List
 * @param {ListResponse[]} list list 
 * 
 * @return {ListToShow[]}
 */
const buildTable = (list: ListResponse[]) => {
  return list.map(({ id, name, symbol, price_usd }) => ({ id, name, symbol, price_usd, showExchanges: true, showCurrencyDetails: true }))
}

const IndexPage = () => {
  const crypto = useSelector(
    (store: StoreInterface) => store.crypto
  );

  const [ListCoins, setList] = useState<ListToShow[]>([])

  useEffect(() => {
    setList(buildTable(crypto.listFiltered))
  }, [crypto.listFiltered])

  return (
    <div className='container'>
      <h4 >Cryptocurrency test</h4>

      <h5>Coins list </h5>
      <Filter />
      <List list={ListCoins} type="currency" />
    </div>
  )
}

export default IndexPage