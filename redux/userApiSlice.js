import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    endpoints: (builder) => ({
        getCurrUser: builder.query({
            query: () => "me",
        }),
    }),
});

export const {useGetCurrUserQuery} = userApi