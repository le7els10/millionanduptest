/* 
  React 
*/
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../helpers/UseDispatch'
import { NavLink, useParams } from 'react-router-dom';

/* 
  Actions 
*/
import { getCoinDetails } from '../../../redux/CryptoActions';

/* 
  Interfaces 
*/
import { CoinsDetailsInterface } from '../interfaces/ListInterface';
import availablePages from '../../../router/AvailablePages';

enum detailsTypes {
    Currency = "currency",
    Exchange = "exchange"
}

const currencyCard = (data: CoinsDetailsInterface | undefined) => {
    return (
        <div>
            <ul className="collection black-text">
                <li className="collection-item">Rank  <span className="badge">{data?.rank}</span></li>
                <li className="collection-item">Name  <span className="badge">{data?.name}</span></li>
                <li className="collection-item">Price BTC  <span className="badge">$ {data?.price_btc}</span></li>
                <li className="collection-item">Price USD  <span className="badge">$ {data?.price_usd}</span></li>
                <li className="collection-item">Symbol  <span className="badge">{data?.symbol}</span></li>
                <li className="collection-item">Percent change 1h  <span className="badge">{data?.percent_change_1h}</span></li>
                <li className="collection-item">Percent change 24h  <span className="badge">{data?.percent_change_24h}</span></li>
                <li className="collection-item">Percent change 7dh  <span className="badge">{data?.percent_change_7d}</span></li>
            </ul>
        </div>
    )
}

const DetailsPage = () => {
    const dispatch = useAppDispatch()
    const { coinDetails } = useAppSelector((store) => store.crypto);
    const [currentDetails, setcurrentDetails] = useState<CoinsDetailsInterface>()

    const { type, id } = useParams()

    useEffect(() => {
        switch (type) {
            case detailsTypes.Currency:
                dispatch(getCoinDetails(id!))
                break;

            default:
                break;
        }

    }, [])

    useEffect(() => {
        setcurrentDetails(coinDetails)
    }, [coinDetails])



    return (
        <div className='container'>
            <div className="card blue-grey darken-1">
                <NavLink to={availablePages.HOME} className="waves-effect waves-light btn">
                    <i className="material-icons left">arrow_back</i>
                    Regresar
                </NavLink>
                <div className="card-content white-text">
                    <span className="card-title">Details</span>
                    {
                        type === detailsTypes.Currency && currencyCard(currentDetails)
                    }
                </div>
            </div>
        </div>
    )
}

export default DetailsPage