import {
    GET_PROBLEMS,
    GET_PROBLEM,
    UNLOAD_SELECTED_PROBLEM,
    GET_TOTAL_BY_COUNTRY,
    SELECT_COUNTRY
} from '../actions/index'

const INITIAL_STATE = { all: [], totalByCountry: [], selectedProblem: null, selectedCountry: null };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_PROBLEMS:
            return {...state, all: action.payload};
        case GET_PROBLEMS:
            return {...state, all: action.payload};
        case GET_TOTAL_BY_COUNTRY:
            return {...state, totalByCountry: action.payload};
        case UNLOAD_SELECTED_PROBLEM:
            return {...state, selectedProblem: null}
        case SELECT_COUNTRY:
            console.log("reducer: " + action.selectedCountry)
            return {...state, selectedCountry: action.selectedCountry}
        default:
            return state;
    }
}
