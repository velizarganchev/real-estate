import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        places: {},
    },
    reducers: {
        addPlaces: (state, action) => {
            state.places = action.payload;
        },
        clear: (state) => {
            state.places = {};
        },
    }
})

export const {addProducts, clear } = bookingSlice.actions;
export default bookingSlice.reducer;