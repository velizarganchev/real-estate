import axios from "axios";
import absoluteUrl from "next-absolute-url";

import {
    ALL_PLACES_SUCCESS,
    ALL_PLACES_FAIL,

    PLACE_DETAILS_SUCCESS,
    PLACE_DETAILS_FAIL,

    CLEAR_ERRORS
} from "../constants/placeConstants";

//Get all places 
export const getAllPlaces = (req) => async (dispatch) => {
    try {
        const { origin } = absoluteUrl(req)

        const { data } = await axios.get(`${origin}/api/places`)
        //console.log(data)
        dispatch({
            type: ALL_PLACES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PLACES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getPlaceDatails = (req, id) => async (dispatch) => {
    try {
        const { origin } = absoluteUrl(req)

        const { data } = await axios.get(`${origin}/api/places/${id}`)

        dispatch({
            type: PLACE_DETAILS_SUCCESS,
            payload: data.place
        })

    } catch (error) {
        dispatch({
            type: PLACE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

//Clear Errors
export const clearErrors = (req) => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}