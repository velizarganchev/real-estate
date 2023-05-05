import { combineReducers } from 'redux';

import { allPlacesReducer } from './placeReducers'

const reducer = combineReducers({
    allPlaces: allPlacesReducer
})

export default reducer