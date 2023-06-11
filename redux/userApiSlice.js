import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://real-estatev.vercel.app/api/' }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getCurrUser: builder.query({
            query: () => "me",
            providesTags: ['Users'],
        }),
        createUser: builder.mutation({
            query: ({
                name,
                email,
                password,
                avatar
            }) => ({
                url: `auth/register`,
                method: 'POST',
                body: {
                    name,
                    email,
                    password,
                    avatar
                },
            }),
            invalidatesTags: ['Users'],
        }),
        updateUser: builder.mutation({
            query: ({
                name,
                email,
                password,
                avatar
            }) => ({
                url: `me/update`,
                method: 'PUT',
                body: {
                    name,
                    email,
                    password,
                    avatar
                },
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});

export const {
    useGetCurrUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
} = userApi