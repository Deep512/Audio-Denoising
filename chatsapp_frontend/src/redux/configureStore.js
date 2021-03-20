import {createStore, combineReducers} from 'redux';
import {Reciepient} from './reducers/reciepient';
import {Message} from './reducers/message';
import { History } from './reducers/history';
import { LoggedinUser } from "./reducers/loggedInUser";
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            reciepient : Reciepient,
            message : Message,
            history : History,
            loggedInUser : LoggedinUser,
        })
    );
    return store;
}