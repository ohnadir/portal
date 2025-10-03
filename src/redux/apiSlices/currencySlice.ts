/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../api/baseApi";

const currencySlice = api.injectEndpoints({
    endpoints: (builder)=>({
        addCurrency: builder.mutation({
            query: (data) => {
                return{
                    method: "POST",
                    url: "/currency",
                    body: data
                }
            }
        }),
        retrieveCurrency: builder.query({
            query: () => {
                return{
                    method: "GET",
                    url: "/currency"
                }
            },
            transformResponse: (response: any) => {
                return response.data;
            }
        }),

    })
})

export const {
    useAddCurrencyMutation,
    useRetrieveCurrencyQuery,
} = currencySlice;