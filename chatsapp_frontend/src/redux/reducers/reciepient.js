import * as actionTypes from '../actionTypes'

export const Reciepient = (state = "", action) => {
    switch(action.type) {
        case actionTypes.UPDATE_RECPNT:
            var n_reciepient = action.payload.reciepientName;
            return n_reciepient;
        default:
            return state;
    }
}