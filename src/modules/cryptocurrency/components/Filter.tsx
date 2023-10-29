/* 
  React 
*/
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { useAppDispatch } from '../../../helpers/UseDispatch'
import { useSelector } from 'react-redux';

/* 
  Actions 
*/
import { setLoading, triggerFilter } from '../../../redux/CryptoActions'

/* 
  Interfaces 
*/
import { StoreInterface } from '../../../redux/interfaces/StoreInterface';

/* 
  Hooks 
*/
import { useDebouncedValue } from '../hooks/useDebounceValue';

/**
 * @method Filter
 * @description implementación componente de busqueda de currency
 * @return {ReactElement}
 */
const Filter = () => {
  const crypto = useSelector(
    (store: StoreInterface) => store.crypto
  );
  const dispatch = useAppDispatch()
  const [Search, setSearch] = useState(crypto.search)
  const debouncedValue = useDebouncedValue(Search)

  useEffect(() => {
    if (crypto.search !== debouncedValue) {
      dispatch(triggerFilter(debouncedValue, crypto.list))
    }
  }, [debouncedValue])

  /**
   * @method handleChange
   * @description Acción al hacer cambio en input de busqueda
   * @param {ChangeEvent<HTMLInputElement>} e element 
   * 
   * 
   * @return {void}
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setLoading(true))

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