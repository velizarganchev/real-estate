import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const placeApi = createApi({
    reducerPath: 'placeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    endpoints: (builder) => ({
        getAllPlaces: builder.query({
            query: () => "places",
        }),
        getPlace: builder.query({
            query: (id) => `places/${id}`,
        }),
    }),
});

export const { useGetAllPlacesQuery, useGetPlaceQuery } = placeApi;