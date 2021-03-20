import * as actionTypes from '../actionTypes'
export const Message = (state = "", action) => {
    switch (action.type) {
        case actionTypes.UPDATE_MSG:
            var new_message = action.payload;
            return new_message;
        default:
            return state;
    }
}