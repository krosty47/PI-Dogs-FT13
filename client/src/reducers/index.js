import { GET_ALL_BREEDS, GET_DETAIL_BREED, GET_TEMPERAMENTS, FILTERS } from '../actions'


const initialState = {
    breeds: [],
    breedDetail: [],
    temperaments: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_BREEDS:
            return {
                ...state,
                breeds: action.payload.sort((a, b) => {
                    if (a.name < b.name) return -1
                    if (a.name > b.name) return 1
                    if (a.name === b.name) return 0
                    return 0
                })
            };
        case FILTERS:
            if (action.type === FILTERS) {
                let filteredDogs = undefined;
                // FILTER DOGS
                if(action.temperament === 'Select Temperaments') {
                    filteredDogs = action.name
                    console.log("LLEGO ACA?",filteredDogs)
                }
                else {
                    filteredDogs = action.name.filter(dog => dog.temperament? dog.temperament.includes(action.temperament): null)
                }
                
                // SORT DOGS
                if(action.sort === 'weight') {
                    filteredDogs.sort((a,b) => {
                        if(a.weight) {
                            let weights = a.weight.split(' - ')
                            var amin = Number(weights[0])
                            if(weights[1]) amin = (Number(weights[1]) + Number(weights[0])) / 2
                        }
                        else if(!a.weight) amin = a.weight
        
                        if(b.weight) {
                            let weights = b.weight.split(' - ')
                            var bmin = Number(weights[0])
                            if(weights[1]) bmin = (Number(weights[1]) + Number(weights[0])) / 2
                        }
                        else if(!b.weight) bmin = b.weight
        
                        return amin - bmin
                    })
                    if(action.order === 'descending') filteredDogs.reverse();
                    return {
                        ...state,
                        breeds: filteredDogs
                    }
                }
                
                if(action.sort === 'name') {
                    filteredDogs.sort((a,b) => {
                        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
                        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                        if(a.name.toLowerCase() === b.name.toLowerCase()) return 0
                        return 0
                    })
                    if(action.order === 'descending') filteredDogs.reverse();
                    return {
                        ...state,
                        breeds: filteredDogs
                    }
                } 
            }
            break;
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