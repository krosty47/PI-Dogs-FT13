import { GET_ALL_BREEDS, GET_DETAIL_BREED, GET_TEMPERAMENTS, ORDER } from '../actions'


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

        case ORDER:
            let filterbreed = undefined;

            // filter breed
            if (action.temperament === 'Select Temperaments') {
                filterbreed = action.name
            }
            else {
                filterbreed = action.name.filter(b => b.temperament ? b.temperament.includes(action.temperament) : null)
            }

            if (action.sort === 'weight') {
                filterbreed.sort((a, b) => {
                    if (a.weight.metric) {
                        let weights = a.weight.metric.split(' - ')
                        var amin = Number(weights[0])
                        if (weights[1]) amin = (Number(weights[1]) + Number(weights[0])) / 2
                    }
                    else if (!a.weight.metric) amin = a.weight

                    if (b.weight.metric) {
                        let weights = b.weight.metric.split(' - ')
                        var bmin = Number(weights[0])
                        if (weights[1]) bmin = (Number(weights[1]) + Number(weights[0])) / 2
                    }
                    else if (!b.weight.metric) bmin = b.weight

                    return amin - bmin
                })
                if (action.order === 'descending') filterbreed.reverse();
                return {
                    ...state,
                    breeds: filterbreed
                }
            }

            if (action.sort === 'name') {
                filterbreed.sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
                    if (a.name.toLowerCase() === b.name.toLowerCase()) return 0
                    return 0
                })
                if (action.order === 'descending') filterbreed.reverse();
                return {
                    ...state,
                    breeds: filterbreed
                }
            }


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