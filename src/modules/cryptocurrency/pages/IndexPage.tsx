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
import React, { ReactElement, useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import Filter from "../components/Filter";
import Loader from "../components/Loader";


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


/**
 * @method IndexPage
 * @description Pagina principal del modulo cryptocurrency
 * 
 * @return {ReactElement}
 */
const IndexPage = () => {
  const crypto = useSelector(
    (store: StoreInterface) => store.crypto
  );

  const [ListCoins, setList] = useState<ListToShow[]>([])
  const [Loading, setLoading] = useState(crypto.isLoading)

  useEffect(() => {
    setList(buildTable(crypto.listFiltered))
  }, [crypto.listFiltered])

  useEffect(() => {
    setLoading(crypto.isLoading)
  }, [crypto.isLoading])


  return (
    <div className='container'>
      <h4 >Cryptocurrency test</h4>

      <h5>Coins list </h5>
      <Filter />

      {
        Loading ?
          (
            <Loader />
          ) :
          (
            <List list={ListCoins} type="currency" />
          )
      }
    </div>
  )
}

export default IndexPage