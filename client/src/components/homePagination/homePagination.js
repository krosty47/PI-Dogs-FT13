import React from 'react';

import '../homePagination/homePagination.css'

export default function HomePagination({ allBreeds, pageNumberLimit, setCurrentPage, itemsPerPage, maxPageNumberLimit, minPageNumberLimit, currentPage, setMaxPageNumberLimit, setminPageNumberLimit }) {

    const paginationNumber = [];


    for (let i = 1; i <= Math.ceil(allBreeds.length / itemsPerPage); i++) { // aplicamos Math.ceil para que los numeros sean enteros
        paginationNumber.push(i);
    }

    const renderPage = paginationNumber.map(number => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return ( // MAP MUESTRA UN BOTON POR CADA ELEMENTO DE paginationNumber
                <div key={number}>
                    <button className='buttonsP' onClick={() => paginate(number)}>
                        {number}
                    </button>
                </div>
            )
        } else {
            return null;
        }
    })

    const paginate = (pNumber) => setCurrentPage(Number(pNumber))

    const next = () => {
        setCurrentPage(currentPage + 1)
        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    }

    const prev = () => {
        setCurrentPage(currentPage - 1)
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }

    let pageIncrementBtn = null;
    if (paginationNumber.length > maxPageNumberLimit) {
        pageIncrementBtn = <li className='buttonsL' onClick={() => next()}>....</li>
    }
    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li className='buttonsL' onClick={() => prev()}>....</li>
    }


    return (
        <div className='homePagination'>
                <ul className='buttonsPagination'>
                    <button className='PrevB' onClick={() => prev()} disabled={currentPage === paginationNumber[0] ? true : false}>PREV</button>
                {pageDecrementBtn}
                <li className='buttonsBox'>
                {renderPage}
                </li>
                {pageIncrementBtn}
                    <button className='NextB' onClick={() => next()} disabled={currentPage === paginationNumber[paginationNumber.length - 1] ? true : false}>NEXT</button>
                </ul>
        </div>
    )
}
