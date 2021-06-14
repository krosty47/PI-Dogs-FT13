import React from 'react'
import { Link } from 'react-router-dom';

import '../homeBreedCard/homeBreedCard.css'


export default function HomeBreedCard({ name, image, temperament, id }) {

    return (
        <div className='cards'>
            <div className='cardBreed' key={id}>
                <h2 className='cardName'>{name}</h2>
                <p className='cardTemps'>{temperament}</p>
                <Link to={`/detail/${id}`}>
                    <img src={image} className='cardImage' alt="No cargo, al horno papurri"/>
                </Link>
                <Link to={`/detail/${id}`}>
                <p className='learnMore'>Learn more...</p>
                </Link>
            </div>
        </div>
    )
}

