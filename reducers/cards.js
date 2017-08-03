import * as types from '../actions/types'

export default function(state = {}, action = {} ) {
    switch (action.type) {
        case types.INIT_CARDS:{
            return action.data
        }
        case types.ADD_CARD:{
            //return Object.assign(state, card)
            //newState = Object.assign({}, state);
            //var card = action.data.card;
            //var cardKey = action.data.key;
            state[state.length] = action.data;
            return state;
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
