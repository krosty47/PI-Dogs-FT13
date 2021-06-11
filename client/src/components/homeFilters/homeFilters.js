import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { filters, getTemperaments } from '../../actions/index';

export default function HomeFilters() {

    const dispatch = useDispatch()
    const temperaments = useSelector(state => state.temperaments)


    const orderBreeds = function (name, temperament, sort, order){
        dispatch(filters(name, temperament, sort, order))
    }

    useEffect(() => {
        const dbTemperaments = () => { dispatch(getTemperaments()) }
        dbTemperaments()
    }, [dispatch])


    return (
        <>
            <div className=''>

                <div className=''>
                    <h1 className=''>Sort by</h1>
                    <div className=''>
                        <select id='sort' className=''>
                            <option value='name'>Name</option>
                            <option value='weight'>Weight</option>
                        </select>
                        <select id='order' className=''>
                            <option value='ascending'>Ascending</option>
                            <option value='descending'>Descending</option>
                        </select>
                        <select id='searchByTemperament' className=''>
                            <option value='Select Temperaments'>Temperament</option>
                            {temperaments.map(t => (<option key={t.id} value={`${t.nameT}`}>{t.nameT}</option>))}
                        </select>
                    </div>
                </div>
                <div className=''>
                    <input id='searchByName' className=''></input>
                    <button className='' onClick={() => orderBreeds(document.getElementById('searchByName').value, document.getElementById('searchByTemperament').value, document.getElementById('sort').value, document.getElementById('order').value)}>Search</button>
                </div>
            </div>
            <hr className='' />
        </>
    )
}
