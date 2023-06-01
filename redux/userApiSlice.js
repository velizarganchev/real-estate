import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    endpoints: (builder) => ({
        getCurrUser: builder.query({
            query: () => "me",
        }),
        getAllUsers: builder.query({
            query: () => `/admin/users`,
        }),
        getUserDetails: builder.query({
            query: (id) => `/admin/users/${id}`,
        }),
    }),
});

export const {
    useGetCurrUserQuery,
    useGetAllUsersQuery,
    useGetUserDetailsQuery
} = userApi