import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { getAllBreeds, getTemperaments } from '../../actions/index';

import '../breedCreation/breedCreation.css'


export default function BreedCreation() {

    const dispatch = useDispatch()  // VAMOS HACER DISPATCH A GETTEMPERAMENTS Y GETALLBREEDS
    const breedsSelector = useSelector(state => state.breeds)
    const temperaments = useSelector(state => state.temperaments)

    const [input, setInput] = useState({
        nameB: '',
        height: '',
        weight: '',
        years: '',
        nameT: [],
    })

    useEffect(() => {
        const dbTemperaments = () => { dispatch(getTemperaments()) }
        dbTemperaments()
    }, [dispatch])

    console.log(temperaments)

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/dog', input).then(r => {
            setInput({
                nameB: '',
                height: '',
                weight: '',
                years: '',
                nameT: [],
            })
        })
            .catch(res => alert('The breed already exist. Please try with other name.'))
    }

    function handleTemperamentSelect(e) {
        if (input.nameT.length === 0) {
            alert('You add 1 temperament!')
        }
        if (input.nameT.length === 1) {
            alert('You add 2 temperament!')
        }
        if (input.nameT.length >= 3) {
            alert('The last was added')
        }
        else {
            setInput({
                ...input,
                nameT: [...input.nameT, e.target.value]
            })
        }
    }


    return (
        <div className='backGCreate'>
            <form className='createCard' onSubmit={handleSubmit}>
                <p>ENTER NAME</p>
                <input className='createName' value={input.name} name='nameB' type='text' required="required" placeholder='Name' onChange={handleInputChange}></input>
                <p>ENTER WEIGHT</p>
                <input className='createWeight' value={input.weight} name='weight' type='number' required="required" placeholder='Weight' onChange={handleInputChange}></input>
                <p>ENTER HEIGHT</p>
                <input className='createHeight' value={input.height} name='height' type='number' required="required" placeholder='Height' onChange={handleInputChange}></input>
                <p>ENTER LIFE_SPAN</p>
                <input className='createYears' value={input.years} name='years' type='number' required="required" placeholder='Life_span' onChange={handleInputChange}></input>
                <p>SELECT TEMPERAMENTS (UP TO 3)</p>
                <select className='createTemps' name='nameT' required="required" onChange={handleTemperamentSelect}>
                    <option value=''>Add Temperaments</option>
                    {temperaments && temperaments.map(t => (<option key={t.id} value={`${t.id}`}>{t.nameT}</option>))}
                </select>
                <input className='createButton' type='submit' value='CREATE'></input>
            </form>
            <form action='/dog/upload' method='POST' enctype="multipart/form-data">
                <input type='file' name='image'></input>
                <button type='submit'>UPLOAD</button>
            </form>
        </div>
    )
}
