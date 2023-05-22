import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const placeApi = createApi({
    reducerPath: 'placeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    endpoints: (builder) => ({
        getAllPlaces: builder.query({
            query: () => "places",
        }),
    }),
});

export const { useGetAllPlacesQuery } = placeApi;