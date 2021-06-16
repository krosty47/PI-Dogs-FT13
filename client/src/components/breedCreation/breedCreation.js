import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { storage } from '../../firebase/index'
import swal from 'sweetalert';

import { getTemperaments } from '../../actions/index';

import '../breedCreation/breedCreation.css'


export default function BreedCreation() {

    const dispatch = useDispatch()  
    const temperaments = useSelector(state => state.temperaments)
    
    
    
    //---------------IMAGE UPLOAD FIREBASE---------------//
    const [image, setImage] = useState(null);

    const handleAddImgChange = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            console.log(e.target.files[0])
            setImage(e.target.files[0])
            showAlertAdd()
        }
    }

    const handleRmvImgChange = (e) => {
        e.preventDefault();
        if (!image || document.getElementById("AddSelect").value === '') {
            showAlert()
            return
        }
        if (image) {
            document.getElementById("AddSelect").value = '';
            showAlertRmv()
        }
    }

    const handleUpload = () => {
        if (!image || document.getElementById("AddSelect").value === '') {
            showAlert()
            return
        }
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on("state_changed", snapshot => { }, error => { console.log(error) },
            () => {
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                    input.img = url
                    showAlertUpload()
                });
            }
        )
    };

    //-----------------------------------------------------//


    useEffect(() => {
        const dbTemperaments = () => { dispatch(getTemperaments()) }
        dbTemperaments()
    }, [dispatch])
    
    const [input, setInput] = useState({
        nameB: '',
        height: '',
        weight: '',
        years: '',
        img: '',
        nameT: [],
    })


    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
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
            showAlertCreate();
        })
            .catch(res => showAlertExist())
    }


    //------------------HANDLE TEMPERAMENTS---------------//

    function handleTemperamentSelect(e) {

        if (input.nameT.length === 0) {
            input.nameT.push(e.target.value)
            showAlertTempsAdded()
            return
        }
        if (input.nameT.length === 1) {
            input.nameT.push(e.target.value)
            showAlertTempsAdded()
            return
        }
        if (input.nameT.length === 2) {
            input.nameT.push(e.target.value)
            showAlertTempsAdded()
            return
        }
    };

    function handleTemperamentRmv(e) {
        e.preventDefault();
        input.nameT.pop()
        showAlertTempsRmv()

    }
    //-----------------------------------------------------//

    //---------------------ALERTS--------------------------//

    const showAlertAdd = () => {
        swal({
            title: 'SELECT FILE',
            text: 'Your file was selected successfully.',
            icon: 'success',
            button: 'Aceptar'
        })
    }

    const showAlertRmv = () => {
        swal({
            title: 'REMOVE FILE',
            text: 'Your file was removed successfully.',
            icon: 'error',
            button: 'Aceptar'
        })
    }

    const showAlert = () => {
        swal({
            title: 'SELECT FILE',
            text: 'Select a file first!.',
            icon: 'warning',
            button: 'Aceptar'
        })
    }

    const showAlertExist = () => {
        swal({
            title: 'ALREADY EXIST',
            text: 'The breed already exist. Please try with other name.',
            icon: 'warning',
            button: 'Aceptar'
        })
    }

    const showAlertCreate = () => {
        swal({
            title: 'BREED SUCCESSFULLY CREATED',
            text: 'CONGRATULATIONS',
            icon: 'success',
            button: 'Aceptar'
        })
    }

    const showAlertUpload = () => {
        swal({
            title: 'THE FILE IS UPLOAD!',
            text: 'Please keep going and create the breed.',
            icon: 'success',
            button: 'Aceptar'
        })
    }

    const showAlertTempsAdded = () => {
        swal({
            title: 'TEMPERAMENT ADDED',
            text: 'Up to 3 !',
            icon: 'success',
            button: 'Aceptar'
        })
    }

    const showAlertTempsRmv = () => {
        swal({
            title: 'TEMPERAMENT REMOVED',
            text: '',
            icon: 'warning',
            button: 'Aceptar'
        })
    }

    //-----------------------------------------------------//

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
                <button className='removeButton' onClick={handleRmvImgChange}>REMOVE FILE</button>
                <button className='removeTemp' onClick={handleTemperamentRmv}>REMOVE TEMP</button>
                <button className='imgUpload' onClick={handleUpload}>UPLOAD</button>
            </div>
        </div>
    )
}
