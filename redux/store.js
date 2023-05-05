import { configureStore } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';

import thunk from 'redux-thunk';
import reducers from './reducers/reducers';


const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload
        }
        return nextState
    } else {
        return reducers(state, action)
    }
}

const makeStore = () =>
    configureStore({
        reducer,
        devTools: true,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
    });

export const wrapper = createWrapper(makeStore);
