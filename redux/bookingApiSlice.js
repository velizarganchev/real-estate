import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const bookingApi = createApi({
    reducerPath: 'bookingApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://real-estate-m8l77a8n2-velizarganchev.vercel.app/api/' }),
    tagTypes: ['Bookings', 'Admin'],
    endpoints: (builder) => ({
        getAllMyBookings: builder.query({
            query: () => `bookings/me`,
            providesTags: ['Bookings'],
        }),
        createBooking: builder.mutation({
            query: ({
                place,
                checkInDate,
                checkOutDate,
                daysOfStay,
                amountPaid,
                paymentInfo
            }) => ({
                url: `bookings`,
                method: 'POST',
                body: {
                    place,
                    checkInDate,
                    checkOutDate,
                    daysOfStay,
                    amountPaid,
                    paymentInfo
                },
            }),
            invalidatesTags: ['Bookings'],
        }),
        getAllBookedDates: builder.query({
            query: (placeId) => `bookings/check_booked_dates?placeId=${placeId}`,
            invalidatesTags: ['Bookings'],
        }),
        getBookingDetails: builder.query({
            query: (id) => `bookings/${id}`,
            invalidatesTags: ['Bookings'],
        }),
        getAllBookings: builder.query({
            query: () => `admin/bookings`,
            providesTags: ['Admin'],
        }),
        deleteBooking: builder.mutation({
            query: (bookingId) => ({
                url: `admin/bookings/${bookingId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Admin'],
        }),
    }),
});

export const {
    useGetAllBookedDatesQuery,
    useCreateBookingMutation,
    useGetAllMyBookingsQuery,
    useGetBookingDetailsQuery,
    useGetAllBookingsQuery,
    useDeleteBookingMutation
} = bookingApi;