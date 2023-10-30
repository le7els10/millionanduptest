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

/* 
Components 
*/
import availablePages from '../../../router/AvailablePages';
import Loader from '../components/Loader';


/**
 * @method DetailsPage
 * @description Pagina para renderizar detalles de currencys
 * 
 * 
 * @return {ReactElement}
 */
const DetailsPage = () => {
    const dispatch = useAppDispatch()
    const { coinDetails, isLoading } = useAppSelector((store) => store.crypto);
    const [currentDetails, setcurrentDetails] = useState<CoinsDetailsInterface>()

    const { id } = useParams()

    useEffect(() => {
        if (isLoading) {
            dispatch(getCoinDetails(id!))
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
                        isLoading ?
                            (
                                <Loader />
                            ) :
                            (
                                <div>
                                    <ul className="collection black-text">
                                        <li className="collection-item">Rank<span className="badge">{currentDetails?.rank}</span></li>
                                        <li className="collection-item">Name  <span className="badge">{currentDetails?.name}</span></li>
                                        <li className="collection-item">Price BTC  <span className="badge">$ {currentDetails?.price_btc}</span></li>
                                        <li className="collection-item">Price USD  <span className="badge">$ {currentDetails?.price_usd}</span></li>
                                        <li className="collection-item">Symbol  <span className="badge">{currentDetails?.symbol}</span></li>
                                        <li className="collection-item">Percent change 1h  <span className="badge">{currentDetails?.percent_change_1h}</span></li>
                                        <li className="collection-item">Percent change 24h  <span className="badge">{currentDetails?.percent_change_24h}</span></li>
                                        <li className="collection-item">Percent change 7dh  <span className="badge">{currentDetails?.percent_change_7d}</span></li>
                                    </ul>
                                </div >
                            )
                    }
                </div >
            </div >
        </div >
    )
}

export default DetailsPage