import { useState, useEffect } from 'react';


/**
 * @method useDebouncedValue
 * @description Hook encargado de esperar que usuario termine de escribir para lanzar una acción
 * 
 * @param {string} input input 
 * @param {number} time time 
 * 
 * @return {string}
 */
export const useDebouncedValue = (input: string = '', time: number = 500) => {

    const [debouncedValue, setDebouncedValue] = useState(input);

    useEffect(() => {

        const timeout = setTimeout(() => {
            setDebouncedValue(input);
        }, time)

        return () => {
            clearTimeout(timeout);
        }
    }, [input])


    return debouncedValue;
}