import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import rootReducer from '../reducers/index';

import {loadState, saveState} from './localStorage';





const persistedState = loadState();


function configureStore(initialState){
    return createStore(
        rootReducer,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(thunk)

    );
}

// TODO give persistedState as param
const store = configureStore();

store.subscribe(throttle( ()=>{
    saveState(store.getState());
}, 1000));

export default store;
