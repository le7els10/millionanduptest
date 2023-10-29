/* 
  Interfaces 
*/
import availablePages from '../../../router/AvailablePages';

/* 
  React 
*/
import { ListToShow } from '../interfaces/ListInterface';
import { NavLink } from "react-router-dom";
import React from 'react'


interface Props {
    list: ListToShow[]
    type: 'exchanges' | 'currency'
}

const List = (props: Props) => {
    const { list, type } = props

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
                                        <NavLink style={exchangesButtonStyle} to={`${availablePages.EXCHANGES}/${id}`} className="waves-effect waves-light btn" >Exchanges</NavLink>
                                        <NavLink style={currencyButtonStyle} to={`${availablePages.DETAILS}/${showExchanges ? "currency" : "exchange"}/${id}`} className="waves-effect waves-light btn" >Details</NavLink>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default List