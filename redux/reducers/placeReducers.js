import { ALL_PLACES_SUCCESS, ALL_PLACES_FAIL, CLEAR_ERRORS } from "../constants/placeConstants";


export const allPlacesReducer = (state = { places: [] }, action) => {
    switch (action.type) {

        case ALL_PLACES_SUCCESS:
            return {
                placesCount: action.payload.placesCount,
                resPerPage: action.payload.resPerPage,
                //filteredPlacesCount: action.payload.filteredPlacesCount,
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