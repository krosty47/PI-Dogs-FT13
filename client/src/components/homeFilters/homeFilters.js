import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { filters, getTemperaments } from '../../actions/index';

import '../homeFilters/homeFilters.css'

export default function HomeFilters() {

    const dispatch = useDispatch()
    const temperaments = useSelector(state => state.temperaments)


    const orderBreeds = function (name, temperament, sort, order) {
        dispatch(filters(name, temperament, sort, order))
    }

    useEffect(() => {
        const dbTemperaments = () => { dispatch(getTemperaments()) }
        dbTemperaments()
    }, [dispatch])

    const onSubmitSearch = (e) => {
        e.preventDefault();
        orderBreeds(document.getElementById('searchByName').value, document.getElementById('searchByTemperament').value, document.getElementById('sort').value, document.getElementById('order').value)
    }

    return (
        <>
            <div className='homeFilters'>
                <div className='searchB'>
                    <form onSubmit={onSubmitSearch}>
                        <button className='searchButton' type='submit'>SEARCH: </button>
                        <input id='searchByName' type='text' className='searchInput'></input>
                    </form>
                </div>
                <div className='sortByDiv'>
                <div className='filtersInfo'>There are many breeds of dog and each one has specific characteristics. Before adopting, check out this page to find the one that matches you completely!</div>
                    <h1 className='sortBy'>SORT BY</h1>
                    <div className='sortByInsideDiv'>
                        <select id='sort' className='sortSelect'>
                            <option className='selectOption' value='name'>Name</option>
                            <option className='selectOption' value='weight'>Weight</option>
                        </select>
                        <select id='order' className='orderSelect'>
                            <option className='selectOption' value='ascending'>Ascending</option>
                            <option className='selectOption' value='descending'>Descending</option>
                        </select>
                        <select id='searchByTemperament' className='tempSelect'>
                            <option className='selectOption' value='Select Temperaments'>Temperament</option>
                            {temperaments && temperaments.map(t => (<option key={t.id} value={`${t.nameT}`}>{t.nameT}</option>))}
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}
