import React from 'react'
import { Link } from 'react-router-dom';

import './breedCard.css'


export default function BreedCard({ name, image, temperament, id }) {

    return (
        <div className='cards'>
            <div className='cardBreed' key={id}>
                <h2>{name}</h2>
                <p>{temperament}</p>
                <Link to={`/detail/${id}`}>
                    <img src={image} className='cardImage' />
                </Link>
            </div>
        </div>
    )
}

