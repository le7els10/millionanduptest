import React from 'react'


/**
 * @method Loader
 * @description implementación componente de cargando
 * @return {ReactElement}
 */
const Loader = () => {
    return (
        <div className="progress">
            <div className="indeterminate"></div>
        </div>
    )
}

export default Loader