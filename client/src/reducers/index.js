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
                breeds: action.payload
            };

        case FILTERS:
            if (action.type === FILTERS) {
                let filteredBreeds= undefined;
                // FILTER BREEDS
                if(action.temperament === 'Select Temperaments') {
                    filteredBreeds = action.name
                    console.log("LLEGO ACA?",filteredBreeds)
                }
                else {
                    filteredBreeds = action.name.filter(b => b.temperament? b.temperament.includes(action.temperament): null)
                }
                
                // SORT BREEDS
                if(action.sort === 'weight') {
                    filteredBreeds.sort((a,b) => {
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
                    if(action.order === 'descending') filteredBreeds.reverse();
                    return {
                        ...state,
                        breeds: filteredBreeds
                    }
                }
                
                if(action.sort === 'name') {
                    filteredBreeds.sort((a,b) => {
                        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
                        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                        if(a.name.toLowerCase() === b.name.toLowerCase()) return 0
                        return 0
                    })
                    if(action.order === 'descending') filteredBreeds.reverse();
                    return {
                        ...state,
                        breeds: filteredBreeds
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