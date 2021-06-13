import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { getAllBreeds, getTemperaments } from '../../actions/index';


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
            .catch(res => alert('Something went wrong, please try again.'))
    }

    function handleTemperamentSelect(e) {
        if (input.nameT.includes(e.target.value)) {
            
         }
        if (input.nameT.length >= 3) {
            alert('You can select up to 3 temperaments.')
        }
        else {
            setInput({
                ...input,
                nameT: [...input.nameT, e.target.value]
            })
        }
    }
    
    
    return (
        <div>
            <h1 className=''>Create Breed</h1>
            <form onSubmit={handleSubmit}>
                <input value={input.name} name='nameB' type='text' required="required" placeholder='  Name' onChange={handleInputChange}></input>
                <input value={input.weight} name='weight' type='text' required="required" placeholder='  Weight' onChange={handleInputChange}></input>
                <input value={input.height} name='height' type='text' required="required" placeholder='  Height' onChange={handleInputChange}></input>
                <input value={input.years} name='years' type='text' required="required" placeholder='  Life_span' onChange={handleInputChange}></input>
                <select name='nameT' required="required" onChange={handleTemperamentSelect}>
                    <option value=''>Add Temperaments</option>
                    {temperaments && temperaments.map(t => (<option key={t.id} value={`${t.id}`}>{t.nameT}</option>))}
                </select>
                <input className='' type='submit' value='Create'></input>
            </form>
        </div>
    )
}
