import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllBreeds } from '../../actions/index';

import HomePagination from '../homePagination/homePagination';
import BreedCard from '../breedCard/breedCard';

export default function Home() {

    /////--------DISPATCH Y STORE-------------///

    const dispatch = useDispatch()
    const breedsSelector = useSelector(state => state.breeds)  // NOS TRAEMOS BREEDS DEL STORE

    /////---------------------------------------///

    /////--------HOOK PARA PAGINATION-----------///

    const [allBreeds, setAllBreeds] = useState([]);

    /////---------------------------------------///

    /////--------HOOK PARA PAGINATION ------------///

    const [currentPage, setCurrentPage] = useState(1);
    const [breedPage] = useState(8);  // UN SOLO ESTADO QUE VA IR CAMBIANDO
    const indexLastBreed = (currentPage * breedPage)
    const indexFirstBreed = (indexLastBreed - breedPage)
    var currentBreeds = allBreeds.slice(indexFirstBreed, indexLastBreed)

    // LOS ESTADOS LOS PASAMOS AL COMPONENT PAGINATION PARA SU CAMBIO

    /////--------------------------------------///

    console.log(currentBreeds)

    // USAMOS useEffect PARA QUE LA FUNCTION EN ACTIONS "LLEVE" LA INFO A BREEDS DEL STORE, CADA VEZ QUE RENDERIZA EL COMPONENTE

    useEffect(() => {
        const apiBreeds = () => { dispatch(getAllBreeds()) } // DISPATCH TO ACTION
        apiBreeds()
    }, [])

    // USAMOS useEffect PARA MANEJAR EL CAMBIO EN BREEDS DEL SELECTOR Y EN PAGINATION

    useEffect(() => {
        const apiBreeds = () => { setAllBreeds(breedsSelector) } // VAMOS A MODIFICAR EL SELECTOR CON UN ESTADO
        apiBreeds()
        setCurrentPage(1)  // VAMOS A CAMBIAR EL ESTADO DE LA PAGINA MODIFICANDO EL SELECTOR 
    }, [breedsSelector])   // SOLO SE VUELVE A EJECUTAR SI EL ESTADO allBreeds CAMBIO 

    // If the data is being fetched:
    // if (loading) {
    //     return (
    //         <div>
    //             <h1>LOADING</h1>
    //         </div>
    //     )
    // }

    // if no breed fount
    if (!currentBreeds.length) {
        return (
            <div>
                We couldn't find that dog!
            </div>
        )
    }

    // if breed found
    return (
        <div className=''>
            <div className=''>
                {currentBreeds && currentBreeds.map(el => (
                    <BreedCard
                        key={el.id}
                        id={el.id}
                        name={el.name}
                        image={el.img}
                        temperament={el.temperament}
                    />
                ))}
            </div>
            <HomePagination
                breedPage={breedPage}
                allBreeds={allBreeds.length}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
};