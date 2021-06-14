import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBreeds } from '../../actions/index';

import HomePagination from '../homePagination/homePagination';
import HomeBreedCard from '../homeBreedCard/homeBreedCard';

import '../home/home.css'

export default function Home() {


    /////----------DISPATCH Y STORE-------------///

    const dispatch = useDispatch()
    const breedsSelector = useSelector(state => state.breeds)  // NOS TRAEMOS BREEDS DEL STORE

    /////---------------------------------------///

    /////--------HOOK TO DISPLAY BREEDS---------///

    const [allBreeds, setAllBreeds] = useState([]);

    /////---------------------------------------///

    /////--------HOOKS FOR PAGINATION ----------///

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(8)

    const [pageNumberLimit] = useState(5)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0)

    const indexLastBreed = (currentPage * itemsPerPage)
    const indexFirstBreed = (indexLastBreed - itemsPerPage)
    var currentBreeds = allBreeds.slice(indexFirstBreed, indexLastBreed)

    // LOS ESTADOS LOS PASAMOS AL COMPONENT PAGINATION PARA SU CAMBIO

    /////--------------------------------------///


    console.log(currentBreeds)

    // USAMOS useEffect PARA QUE LA FUNCTION EN ACTIONS "LLEVE" LA INFO A BREEDS DEL STORE, CADA VEZ QUE RENDERIZA EL COMPONENTE

    useEffect(() => {
        const dbBreeds = () => { dispatch(getAllBreeds()) } // DISPATCH TO ACTION
        dbBreeds()
    }, [dispatch])

    // USAMOS useEffect PARA MANEJAR EL CAMBIO EN BREEDS DEL SELECTOR Y EN PAGINATION

    useEffect(() => {
        const dbBreeds = () => { setAllBreeds(breedsSelector) } // VAMOS A MODIFICAR EL SELECTOR CON UN ESTADO
        dbBreeds()
        setCurrentPage(1)  // VAMOS A CAMBIAR EL ESTADO DE LA PAGINA MODIFICANDO EL SELECTOR 
    }, [breedsSelector])   // SOLO SE VUELVE A EJECUTAR SI EL ESTADO allBreeds CAMBIO 

    if (!breedsSelector.length) {
        return (
            <div className='notBreedFound'>
                LOADING...
            </div>
        )
    }

    // if breed found
    return (
        <div className='outBreed'>
            <div className='cardsPosition'>
                {currentBreeds && currentBreeds.map(el => (
                    <HomeBreedCard
                        key={el.id}
                        id={el.id}
                        name={el.name}
                        image={el.img}
                        temperament={el.temperament}
                    />
                ))}
            </div>
            <HomePagination
                pageNumberLimit={pageNumberLimit}
                itemsPerPage={itemsPerPage}
                allBreeds={allBreeds}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                maxPageNumberLimit={maxPageNumberLimit}
                setMaxPageNumberLimit={setMaxPageNumberLimit}
                minPageNumberLimit={minPageNumberLimit}
                setminPageNumberLimit={setminPageNumberLimit}
            />
        </div>
    )
};