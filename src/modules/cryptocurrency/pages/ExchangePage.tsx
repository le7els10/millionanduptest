/* 
  React 
*/
import { useParams, NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

/* 
Actions 
*/
import { getExchanges } from '../../../redux/CryptoActions';

/* 
Hooks 
*/
import { useAppDispatch, useAppSelector } from '../../../helpers/UseDispatch';

/* 
Interfaces 
*/
import { ExchangeResponse } from '../interfaces/ExchangeInterface';
import { ListToShow } from '../interfaces/ListInterface';

/* 
Components 
*/
import List from '../components/List';
import availablePages from '../../../router/AvailablePages';

/**
 * @method buildTable
 * @description Obtener estructura legible para componente List
 * @param {ExchangeResponse[]} list list 
 * 
 * @return {ListToShow[]}
 */
const buildTable = (list: ExchangeResponse[]) => {
  return list.map(({ name, price_usd, base }, i) => ({ id: i.toString(), name, symbol: base, price_usd: price_usd.toString(), showExchanges: false }))
}

const ExchangePage = () => {
  const dispatch = useAppDispatch()
  const { exchanges } = useAppSelector((store) => store.crypto);
  const [ListExchanges, setListExchanges] = useState<ListToShow[]>([])
  const { id } = useParams()

  useEffect(() => {
    console.log('here');

    dispatch(getExchanges(id!))
  }, [])

  useEffect(() => {
    setListExchanges(buildTable(exchanges))
  }, [exchanges])


  return (<div className='container'>
    <NavLink to={availablePages.HOME} className="waves-effect waves-light btn">
      <i className="material-icons left">arrow_back</i>
      Regresar
    </NavLink>

    <h5>Exchanges in USD</h5>
    <List list={ListExchanges} type="exchanges" />
  </div>
  )
}

export default ExchangePage