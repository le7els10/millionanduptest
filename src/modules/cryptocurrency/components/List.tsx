/* 
  Interfaces 
*/
import availablePages from '../../../router/AvailablePages';
import { ListToShow } from '../interfaces/ListInterface';

/* 
  React 
*/
import React, { ReactHTMLElement } from 'react'
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../../helpers/UseDispatch';

/* 
  Actions 
*/
import { setLoading } from '../../../redux/CryptoActions';


interface Props {
    list: ListToShow[]
    type: 'exchanges' | 'currency'
}

/**
     * @method List
     * @description Implementación componente de listado de datos.
     * @return {ReactHTMLElement}
     */
const List = (props: Props) => {
    const { list, type } = props
    const navigate = useNavigate()
    const dispatch = useAppDispatch()


    const goToRoute = (uri: string) => {
        dispatch(setLoading(true))

        navigate(uri)
    }

    if (list.length > 0) {
        return (
            <div>
                <table className='highlight responsive-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Price USD</th>
                            {type === "currency" && (<th>Actions</th>)}
                        </tr>
                    </thead>

                    <tbody>
                        {
                            list.map(({ id, name, symbol, price_usd, showExchanges }, i) => {

                                const exchangesButtonStyle = {
                                    display: type === "currency" ? "inline-block" : "none",
                                    margin: "0 10px"
                                }

                                const currencyButtonStyle = {
                                    display: type === "currency" ? "inline-block" : "none"
                                }

                                return (
                                    <tr key={i}>
                                        <td>{name}</td>
                                        <td>{symbol}</td>
                                        <td>$ {price_usd}</td>
                                        <td >
                                            <button style={exchangesButtonStyle} onClick={() => goToRoute(`${availablePages.EXCHANGES}/${id}`)} className="waves-effect waves-light btn" >Exchanges</button>
                                            <button style={currencyButtonStyle} onClick={() => goToRoute(`${availablePages.DETAILS}/${id}`)} className="waves-effect waves-light btn" >Details</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div className='center-align'>
                No existen valores relacionados
            </div>
        )
    }
}

export default List