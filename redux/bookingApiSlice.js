import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const bookingApi = createApi({
    reducerPath: 'bookingApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    endpoints: (builder) => ({
        getAllBookedDates: builder.query({
            query: (placeId) => `bookings/check_booked_dates?placeId=${placeId}`,
        }),
        getAllMyBookings: builder.query({
            query: () => `bookings/me`,
        }),
        getBookingDetails: builder.query({
            query: (id) => `bookings/${id}`,
        }),
    }),
});

export const {
    useGetAllBookedDatesQuery,
    useGetAllMyBookingsQuery,
    useGetBookingDetailsQuery
} = bookingApi;