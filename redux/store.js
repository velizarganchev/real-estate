import { configureStore } from "@reduxjs/toolkit";
import bookingSlice from "./bookingWidgetSlice";

export default configureStore({
    reducer: {
        [bookingSlice.name]: bookingSlice.reducer,
    },
});