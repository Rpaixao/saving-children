import { GET_PROBLEMS, GET_PROBLEM, UNLOAD_SELECTED_PROBLEM } from '../actions/index'

const INITIAL_STATE = { all: [], selectedProblem: null };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_PROBLEMS:
            return {...state, all: action.payload};
        case GET_PROBLEM:
            return {...state, selectedProblem: action.payload};
        case UNLOAD_SELECTED_PROBLEM:
            return {...state, selectedProblem: null}
        default:
            return state;
    }
}
