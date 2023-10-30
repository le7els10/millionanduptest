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
import Loader from '../components/Loader';

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

/**
 * @method ExchangePage
 * @description Pagina para renderizar exchanges de una currency
 * 
 * 
 * @return {ReactElement}
 */
const ExchangePage = () => {
  const dispatch = useAppDispatch()
  const { exchanges, isLoading } = useAppSelector((store) => store.crypto);
  const [Loading, setLoading] = useState(isLoading)
  const [ListExchanges, setListExchanges] = useState<ListToShow[]>([])
  const { id } = useParams()


  useEffect(() => {
    if (isLoading) {
      dispatch(getExchanges(id!))
    }
  }, [])

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    setListExchanges(buildTable(exchanges))
  }, [exchanges])



  return (
    <div className='container'>
      <div className='row valign-wrapper'>
        <div className="col s3">
          <NavLink to={availablePages.HOME} className="waves-effect waves-light btn">
            <i className="material-icons left">arrow_back</i>
            Regresar
          </NavLink>
        </div>
        <div className="col s9">
          <h5>Exchanges in USD</h5>
        </div>

      </div>

      {
        Loading ? <Loader /> : <List list={ListExchanges} type="exchanges" />
      }

    </div>
  )
}

export default ExchangePage