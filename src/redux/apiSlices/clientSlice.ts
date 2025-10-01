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
        activeClients: builder.query({
            query: () => {
                return {
                    method: "GET",
                    url: "/client/active-statistic"
                }
            },
            transformResponse: (response: any) => {
                return response.data.clients;
            }
        }),
        clientDetails: builder.query({
            query: (id) => {
                return {
                    method: "GET",
                    url: `/transaction/${id}`
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
        status: builder.mutation({
            query: (id) => {
                return {
                    method: "PATCH",
                    url: `/client/${id}`
                }
            }
        }),
        clientStatistic: builder.query({
            query: () => {
                return {
                    method: "GET",
                    url: `/client/statistic`
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
    useStatusMutation,
    useClientDetailsQuery,
    useClientStatisticQuery,
    useActiveClientsQuery
} = clientSlice;