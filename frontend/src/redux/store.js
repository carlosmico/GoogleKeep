//REDUX
import {createStore, compose} from 'redux'
import { model } from 'mongoose';

const initialState = {
    userLogged: {}
}

//Reducer Global
function reducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            console.log(action.payload)
            return state = {
                ...state,
                userLogged: action.payload
            };

        default:
            return state;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers());

export default (store)