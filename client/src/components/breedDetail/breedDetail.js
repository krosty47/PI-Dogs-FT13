import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailBreed } from '../../actions/index';

import '../breedDetail/breedDetail.css'

export default function BreedDetail({ match }) {


    const dispatch = useDispatch()
    const oneBreed = useSelector(state => state.breedDetail)


    useEffect(() => {
        const dbBreed = () => { dispatch(getDetailBreed(match.params.id)) }
        dbBreed()
    }, [dispatch, match.params.id])

    //  IF THE BREED DON T HAVE ANY TEMPERAMENTS


    if (oneBreed.temperament) {
        var temperaments = oneBreed.temperament
    }
    else temperaments = []


    return (
        <div className='backGDetail'>
            <div className='AllCardDetail'>
                <h1>{oneBreed.name}</h1>

                <div>
                    <img className='cardDetailImage' src={oneBreed.img} alt='img not found'></img>
                </div>
                <h3>HEIGHT: ({oneBreed.height})</h3>
                <h3>WEIGHT: ({oneBreed.weight})</h3>
                <h3>LIFE SPAN: ({oneBreed.life_span})</h3>
                <h3>TEMPERAMENTS: ({temperaments})</h3>
            </div>
        </div>
    )
}
