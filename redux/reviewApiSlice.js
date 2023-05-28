import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    endpoints: (builder) => ({
        getAllReviews: builder.query({
            query: () => "reviews",
        }),
        checkAvailability: builder.query({
            query: (id) => `reviews/check_review_availability?placeId=${id}`,
        }),
    }),
});

export const {
    useGetAllReviewsQuery,
    useCheckAvailabilityQuery
} = reviewApi;