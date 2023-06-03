import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    tagTypes: ['Reviews'],
    endpoints: (builder) => ({
        getAllReviews: builder.query({
            query: (id) => `reviews?id=${id}`,
            providesTags: ['Reviews'],
        }),
        checkAvailability: builder.query({
            query: (id) => `reviews/check_review_availability?placeId=${id}`,
        }),
        deleteReview: builder.mutation({
            query: ({ id, placeId }) => ({
                url: `reviews?id=${id}&placeId=${placeId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Reviews'],
        }),
    }),
});

export const {
    useGetAllReviewsQuery,
    useCheckAvailabilityQuery,
    useDeleteReviewMutation
} = reviewApi;