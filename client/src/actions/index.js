import axios from 'axios';


export const GET_ALL_BREEDS = "GET_ALL_BREEDS";
export const GET_BREED_NAME = "GET_BREED_NAME";
export const GET_DETAIL_BREED = "GET_DETAIL_BREED";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";



export function getAllBreeds(){
    return (dispatch) =>{
        axios.get('http://localhost:3001/dogs').then(response =>{
            dispatch({type: GET_ALL_BREEDS, payload: response.data })
            console.log(response.data)
        })
    }
}

export function getBreedName(nameFront){
    return (dispatch) =>{
        axios.get(`http://localhost:3001/dogs?name=${nameFront}`).then(response =>{
            dispatch({type: GET_BREED_NAME, payload: response.data })
        })
    }
}

export function getDetailBreed(idBreed){
    return (dispatch) =>{
        axios.get(`http://localhost:3001/dogs/detail/${idBreed}`).then(response =>{
            dispatch({type: GET_DETAIL_BREED, payload: response.data })
        })
    }
}


export function getTemperaments(){
    return (dispatch) =>{
        axios.get(`http://localhost:3001/temperament`).then(response =>{
            dispatch({type: GET_TEMPERAMENTS, payload: response.data })
        })
    }
}




