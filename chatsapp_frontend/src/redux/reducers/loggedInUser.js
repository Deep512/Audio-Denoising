import * as actionTypes from '../actionTypes'

export const LoggedinUser = (state = "", action) => {
    switch (action.type) {
        case actionTypes.UPDATE_LGINUSR:
            var new_logggedInUser = action.payload.loggedinUser;
            return new_logggedInUser;
        default:
            return state;
    }
}