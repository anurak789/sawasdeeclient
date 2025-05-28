import { createApi} from "@reduxjs/toolkit/query/react";
import { Product } from "../../app/models/product";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";

export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    //baseQuery: fetchBaseQuery({baseUrl: 'https://localhost:7037/api'}),
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchProduct: builder.query<Product[], void>({
            query: () => ({url: 'products'})
        }),
        fetchProductDetails: builder.query<Product, number>({
            query: (productId) => `products/${productId}` 
        }),
        fetchFilters: builder.query<{brands: string[], types: string[]}, void>({
            query: () => 'products/filters'
        })
    })
});

export const {useFetchProductDetailsQuery, useFetchProductQuery, useFetchFiltersQuery} = catalogApi;