import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://real-estatev.vercel.app/api/' }),
    tagTypes: ['Reviews'],
    endpoints: (builder) => ({
        getAllReviews: builder.query({
            query: (id) => `reviews?id=${id}`,
            providesTags: ['Reviews'],
        }),
        checkAvailability: builder.query({
            query: (id) => `reviews/check_review_availability?placeId=${id}`,
        }),
        createReview: builder.mutation({
            query: ({
                rating,
                comment,
                placeId
            }) => ({
                url: `reviews`,
                method: 'PUT',
                body: {
                    rating,
                    comment,
                    placeId
                },
            }),
            invalidatesTags: ['Reviews'],
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
    useCreateReviewMutation,
    useDeleteReviewMutation
} = reviewApi;