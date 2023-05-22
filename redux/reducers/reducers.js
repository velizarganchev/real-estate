import { combineReducers } from 'redux';

import { allPlacesReducer, placeDetailsReducer } from './placeReducers'

const reducer = combineReducers({
    allPlaces: allPlacesReducer,
    placeDetails: placeDetailsReducer
})

export default reducer