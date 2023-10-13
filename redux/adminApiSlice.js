import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    tagTypes: ['Admin'],
    endpoints: (builder) => ({
        getAllAdminUsers: builder.query({
            query: () => `/admin/users`,
            providesTags: ['Admin'],

        }),
        getUserAdminDetails: builder.query({
            query: (id) => `/admin/users/${id}`,
            invalidatesTags: ['Admin'],
        }),
        updateAdminUser: builder.mutation({
            query: ({
                userId,
                name,
                email,
                role
            }) => ({
                url: `admin/users/${userId}`,
                method: 'PUT',
                body: {
                    name,
                    email,
                    role
                },
            }),
            invalidatesTags: ['Admin'],
        }),
        deleteAdminUser: builder.mutation({
            query: (userId) => ({
                url: `admin/users/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['test'],
        }),
    }),
});

export const {
    useUpdateAdminUserMutation,
    useGetAllAdminUsersQuery,
    useGetUserAdminDetailsQuery,
    useDeleteAdminUserMutation
} = adminApi