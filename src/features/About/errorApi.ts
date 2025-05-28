import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";

export const errorApi = createApi({
    reducerPath: 'errorApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        get400Error: builder.query<void, void>({
            query: () => ({url: 'Handling/bad-request'})
        }),
        get401Error: builder.query<void, void>({
            query: () => ({url: 'Handling/unauthorized'})
        }),
        get404Error: builder.query<void, void>({
            query: () => ({url: 'Handling/not-found'})
        }),
        get500Error: builder.query<void, void>({
            query: () => ({url: 'Handling/server-error'})
        }),
        getValidationError: builder.query<void, void>({
            query: () => ({url: 'Handling/validation-error'})
        })
    })
});

export const {
    useLazyGet400ErrorQuery,
    useLazyGet401ErrorQuery,
    useLazyGet404ErrorQuery,
    useLazyGet500ErrorQuery,
    useLazyGetValidationErrorQuery
} = errorApi;