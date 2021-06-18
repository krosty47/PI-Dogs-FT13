import axios from 'axios';


export const GET_ALL_BREEDS = "GET_ALL_BREEDS";
export const GET_BREED_NAME = "GET_BREED_NAME";
export const GET_DETAIL_BREED = "GET_DETAIL_BREED";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTERS = "FILTERS";


// ALL BREEDS FROM API
export function getAllBreeds() {
    return (dispatch) => {
        axios.get('http://localhost:3001/dogs').then(response => {
            dispatch({ type: GET_ALL_BREEDS, payload: response.data })
        })
    }
};

// SPECIFIC BREED BY NAME
const getBreedsName = async function (nameFront) {
    const response = await axios.get(`http://localhost:3001/dogs?nameFront=${nameFront}`);
    const breeds = response.data;
    return breeds
}
export function filters(nameFront, temperament, sort, order) {
    return async (dispatch) => dispatch({ type: FILTERS, name: await getBreedsName(nameFront), temperament: temperament, sort: sort, order: order })
};

// FOR DETAIL OF A BREED
export function getDetailBreed(idBreed) {
    return (dispatch) => {
        axios.get(`http://localhost:3001/dogs/detail/${idBreed}`).then(response => {
            dispatch({ type: GET_DETAIL_BREED, payload: response.data })
        })
    }
};
// TEMPERAMENTS
export function getTemperaments() {
    return (dispatch) => {
        axios.get(`http://localhost:3001/temperament`).then(response => {
            dispatch({ type: GET_TEMPERAMENTS, payload: response.data })
        })
    }
};





