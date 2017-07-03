import * as types from './types'

export function initCards(data) {
    return {
        type: types.INIT_CARDS,
        data: data
    }
}

export function addCard(data) {

    return {
        type: types.ADD_CARD,
        data: data
    }
}

export function deleteCard(data) {
    return {
        type: types.DELETE_CARD,
        data: data
    }
}


export function updateCard(data) {

    return {
        type: types.UPDATE_CARD,
        data: data
    }
}
