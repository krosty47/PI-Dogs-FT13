import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllBreeds, getBreedName, getDetailBreed, getTemperaments } from '../../actions/index';

import './home.css'

export default function Home() {

/////--------DISPATCH Y STORE------------///
    const dispatch = useDispatch();
    const breedName = useSelector(state => state.breeds);
    const breedTosort = useSelector(state => state.breeds)

// USAR OTRO SELECTOR PARA TRAER EL ESTADO
    /////------------------------------------///
    
    
    
    /////--------BACK AND FOWARD PAGE--------///
    const [list, setList] = useState(1)
    const s2 = (list * 8)
    const s1 = (s2 - 8)
    var view = breedName.slice(s1, s2)
    
    const handleClickBack = (e) =>{
        e.preventDefault()
        if(list > 1){
            setList(list -1)
        }
    };
    //--------------------------------------///
    
    //------------ASC-DES-----------------///

    const [order, setOrder] = useState(false)

        //breedName.sort((a,b) => (a+b))
        // const DES = breedName.sort((a,b) => (a-b))
    
        // PROBAR CON STATE
        const ASCClickHandler = (e) =>{
            e.preventDefault();
            if(order === false)
            breedTosort.sort(((a,b) => (a+b)))
            dispatch(getAllBreeds())
        };

    

//----------------FORM------------------///

    const [input, setInput] = useState({
        breed: "",
    })

    const handbleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    const handleDispatch = (e) => {
        e.preventDefault();
        input.breed ? dispatch(getBreedName(input.breed)) : alert("You must enter a valid breed name")
    }
//-------------------------------------///


//-----------USE EFFECT for HOME-------///

    useEffect(() => {
        dispatch(getAllBreeds())
    },[]);

//------------------------------------///




    return (
        <div className='home'>
            {/* barra de navegación */}

            <li>
                <form className='formBreeds' onSubmit={handleDispatch}>

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
                </form>
            </li>


            <div className='cards'>
                <div>
                    {view && view.map((el) => (

                        <div className='cardBreed' key={el.id}>
                            <h2>{el.name}</h2>
                            <p>{el.temperament}</p>
                            <Link to={`/detail/${el.id}`}>
                                <img src={el.img} className='cardImage' />
                            </Link>
                        </div>

                    ))}
                </div>
            </div>

            <div>
 
                <button onClick={ASCClickHandler}>ASCENDING ORDER</button>
                <button onClick={ASCClickHandler}>DESCENDING ORDER</button>

            </div>

            <div className='listPages'>
                <button onClick={handleClickBack}>Backward</button>
                <button>{list}</button>
                <button onClick={() => setList(list + 1)}>Forward</button>
            </div>

        </div>
    )
};
