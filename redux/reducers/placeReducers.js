import {
    ALL_PLACES_SUCCESS,
    ALL_PLACES_FAIL,
    
    PLACE_DETAILS_SUCCESS,
    PLACE_DETAILS_FAIL,

    CLEAR_ERRORS
} from "../constants/placeConstants";


export const allPlacesReducer = (state = { places: [] }, action) => {
    switch (action.type) {

        case ALL_PLACES_SUCCESS:
            return {
                placesCount: action.payload.placesCount,
                resPerPage: action.payload.resPerPage,
                //filteredPlacesCount: action.payload.filteredPlacesCount,???????????????
                places: action.payload.places
            }

        case ALL_PLACES_FAIL:
            return {
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const placeDetailsReducer = (state = { place: {} }, action) => {
    switch (action.type) {

        case PLACE_DETAILS_SUCCESS:
            return {
                place: action.payload
            }

        case PLACE_DETAILS_FAIL:
            return {
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}