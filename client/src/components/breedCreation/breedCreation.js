import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { storage } from '../../firebase/index'
import swal from 'sweetalert';

import { getAllBreeds, getTemperaments } from '../../actions/index';

import '../breedCreation/breedCreation.css'


export default function BreedCreation() {

    const dispatch = useDispatch()  // VAMOS HACER DISPATCH A GETTEMPERAMENTS Y GETALLBREEDS
    const breedsSelector = useSelector(state => state.breeds)
    const temperaments = useSelector(state => state.temperaments)

    const [image, setImage] = useState(null);




//---------------IMAGE UPLOAD FIREBASE---------------//

    const handleAddImgChange = e => {
        e.preventDefault();
        const fileArray = Array.from(e.target.files)
        if (image){
            setImage(null)
            showAlertRmv()
            return
        }
        if (e.target.files[0]) {
            console.log(e.target.files[0])
            setImage(e.target.files[0])
            showAlertAdd()
            return
        }
    }
    console.log('IMAGE', image)

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        input.img = url
                        alert('the image was added successfully')
                    });
            }
        )
    };

//-----------------------------------------------------//


    const [input, setInput] = useState({
        nameB: '',
        height: '',
        weight: '',
        years: '',
        img: '',
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
                img: '',
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
        if (input.nameT.length >= 2) {
            alert('The last was added')
        }
        else {
            setInput({
                ...input,
                nameT: [...input.nameT, e.target.value]
            })
        }
    }


    //-------------ALERTS---------------//

    const showAlertAdd = () =>{
        swal({
            title: 'SELECT FILE',
            text: 'Your file was selected successfully.',
            icon: 'success',
            button: 'Aceptar'
        })
    }

    const showAlertRmv = () =>{
        swal({
            title: 'REMOVE FILE',
            text: 'Your file was removed successfully.',
            icon: 'error',
            button: 'Aceptar'
        })
    }

    const showAlert = () =>{
        swal({
            title: 'SELECT FILE',
            text: 'Select a file first!.',
            icon: 'warning',
            button: 'Aceptar'
        })
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
            <div className='imgPosition'>
                <label className='imgInput' htmlFor='AddSelect'>SELECT FILE</label>
                <input className='imgInputDefault' type='file' id='AddSelect' onChange={handleAddImgChange}></input>
                <button className='removeButton' onClick={handleAddImgChange}>REMOVE FILE</button>
                <button className='imgUpload' onClick={handleUpload}>UPLOAD</button>
            </div>
        </div>
    )
}
