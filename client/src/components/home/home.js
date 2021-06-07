import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllBreeds, getBreedName, getDetailBreed, getTemperaments} from '../../actions/index'


export default function Home() {

    // NOS TRAEMOS BREEDS CON HOOK
    const dispatch = useDispatch();
    const breedName = useSelector( state => state.breeds)

    console.log(breedName)
    const [input, setInput] = useState({
        breed: '',
    })

    const handbleInput = (e) =>{
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    const handleDispatch = (e) => {
        e.preventDefault();
    
        if (input.breed) {
            getBreedName(input.breed)
        }
        else {
          alert("You must enter a breed name")
        }
    }

    useEffect(()=>{

        dispatch(getAllBreeds())

    },[])


    return (
        <div className='home'>
            {/* barra de navegación */}

            <li>
                <form className='formBreeds' onSubmit={handleDispatch}></form>

                <div>
                    <input
                    type='text'
                    autoComplete='off'
                    placeholder='Breeds'
                    name='breed'    
                    value={input.breed}
                    onChange={handbleInput}
                    />
                </div>
                <button className='formButton' type='submit'>Search</button>

            </li>
        </div>
    )
}
