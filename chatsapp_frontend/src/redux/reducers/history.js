import * as actionTypes from '../actionTypes'

export const History = (state = "", action) => {
    switch (action.type) {
        case actionTypes.UPDATE_HSTR:
            var new_history = action.payload.history;
            return new_history;
        default:
            return state;
    }
}