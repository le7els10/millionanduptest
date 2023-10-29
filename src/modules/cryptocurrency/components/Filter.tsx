import React, { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch } from '../../../helpers/UseDispatch'
import { triggerFilter } from '../../../redux/CryptoActions'
import { useSelector } from 'react-redux';
import { StoreInterface } from '../../../redux/interfaces/StoreInterface';
import { useDebouncedValue } from '../hooks/useDebounceValue';

const Filter = () => {
    const crypto = useSelector(
        (store: StoreInterface) => store.crypto
    );
    const dispatch = useAppDispatch()
    const [Search, setSearch] = useState("")
    const debouncedValue = useDebouncedValue(Search)
    useEffect(() => {
        setSearch(crypto.search)
    }, [])

    useEffect(() => {
        dispatch(triggerFilter(debouncedValue, crypto.list))
    }, [debouncedValue])


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value
        setSearch(val)
    }

    return (
        <div>
            <div className="input-field col s12">
                <input id="currency_input" placeholder='Filter by currency' type='text' className='validate' value={Search} onChange={handleChange}></input>
            </div>
        </div>
    )
}

export default Filter