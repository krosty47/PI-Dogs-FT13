import React from 'react';



export default function HomePagination({ allBreeds, breedPage, setCurrentPage }) {

    const paginationNumber = [];

    // This for loop pushes an item with a number for every page in the pagination

    for (let i = 1; i <= Math.ceil(allBreeds / breedPage); i++) { // aplicamos Math.ceil para que los numeros sean enteros
        paginationNumber.push(i);
    }

    // Changes the current page in order to show the correct dogs
    const paginate = (pNumber) => setCurrentPage(pNumber)

    return (
        <div className=''>
            <div className=''>
                {paginationNumber.map(number => ( // MAP MUESTRA UN BOTON POR CADA ELEMENTO DE paginationNumber
                    <div key={number}>
                        <button className='' onClick={() => paginate(number)}>
                            {number}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
