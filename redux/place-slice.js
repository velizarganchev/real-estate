import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';
import axios from "axios";
import absoluteUrl from "next-absolute-url";


const initialState = {
    success: false,
    placesCount: 0,
    resPerPage: 0,
    value: [],
}

export const placeSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        getAllPlaces: (state, action) => {
        
            state.success = action.payload.success;
            state.placesCount = action.payload.placesCount;
            state.resPerPage = action.payload.resPerPage;
            state.value = action.payload.places;

        },
        hasError: (state, action) => {
            state.error = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase([HYDRATE], (state, action) => {
            return {
                ...state,
                ...action.payload.places,
            }
        })
    }
})
export const fetchAllPlaces = (req) => async (dispatch) => {
    try {
        const { origin } = absoluteUrl(req)
        await axios.get(`${origin}/api/places`)
            .then((response) => dispatch(getAllPlaces(response.data)))
    }
    catch (e) {
        dispatch(hasError(e.message))
    }
}

export const { getAllPlaces, hasError } = placeSlice.actions;
export const selectPlaces = (state) => state.places.value;
export default placeSlice.reducer;