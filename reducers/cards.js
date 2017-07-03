import * as types from '../actions/types'

export default function(state = {}, action = {}) {
    switch (action.type) {
        case types.INIT_CARDS:{
            return action.data
        }
        case types.ADD_CARD:{
            var card = action.data;
            return {...state, card }
        }
        case types.DELETE_CARD:{
            var newState = {...state};
            delete newState[action.data];
            return newState
        }
        default:
            return state;
    }
}
