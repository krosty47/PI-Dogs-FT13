import {GET_ALL_BREEDS, GET_BREED_NAME, GET_DETAIL_BREED, GET_TEMPERAMENTS} from '../actions'


const initialState = {
    breeds: [],
    breedDetail: [],
    temperaments: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_BREEDS: 
        return {
            ...state,
            breeds: action.payload
        }
        case GET_BREED_NAME:
            return {
                ...state,
                breeds: action.payload
            }
        case GET_DETAIL_BREED:
        return {
            ...state,
            breedDetail: action.payload
        }
        case GET_TEMPERAMENTS:
        return {
            ...state,
            temperaments: action.payload
        }
        default:
            return state;
    }

}

export default rootReducer;