/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../api/baseApi";

const clientSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        addClient: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/client",
                    body: data
                }
            }
        }),
        clients: builder.query({
            query: () => {
                return {
                    method: "GET",
                    url: "/client"
                }
            },
            transformResponse: (response: any) => {
                return response.data;
            }
        }),
        summary: builder.query({
            query: () => {
                return {
                    method: "GET",
                    url: "/client/summary"
                }
            },
            transformResponse: (response: any) => {
                return response.data;
            }
        }),
    })
})

export const {
    useAddClientMutation,
    useClientsQuery,
    useSummaryQuery,
} = clientSlice;