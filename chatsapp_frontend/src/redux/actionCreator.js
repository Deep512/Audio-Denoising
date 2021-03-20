import * as actionTypes from './actionTypes';

export const updateReciepient = (reciepientName) => ({
    type: actionTypes.UPDATE_RECPNT,
    payload: {
        reciepientName:reciepientName,
    }
})

export const updateHistory = (new_history) => ({
    type:actionTypes.UPDATE_HSTR,
    payload: {
        history:new_history,
    }
})
export const updateLoggedInUser = (new_user) => ({
    type:actionTypes.UPDATE_LGINUSR,
    payload: {
        loggedinUser:new_user,
    }
})
export const updateMessage = (new_message) => ({
    type:actionTypes.UPDATE_MSG,
    payload: {
        from:new_message.from,
        to:new_message.to,
        text:new_message.text,
        type:new_message.type,
        enc:new_message.enc
    }
})