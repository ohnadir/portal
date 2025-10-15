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
            },
            transformErrorResponse: (response: any) => {
                return response.data;
            }
        }),
        clients: builder.query({
            query: ({page, search, status, limit}: {page?: number, search?: string, status?: "active" | "inactive", limit?: number}) => {
                const params = new URLSearchParams()
                if (page) params.append("page", page.toString())
                if (search) params.append("searchTerm", search)
                if (status) params.append("status", status)
                if (limit) params.append("limit", limit.toString())
                return {
                    method: "GET",
                    url: `/client?${params.toString()}`,
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
            query: ({id, page, date, search}: {id: string, page: number, date?: string, search?: string}) => {
                const params = new URLSearchParams()
                if (page) params.append("page", page.toString())
                if (search) params.append("searchTerm", search)
                if (date) params.append("date", date)
                return {
                    method: "GET",
                    url: `/transaction/${id}?${params.toString()}`
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
        updateClient: builder.mutation({
            query: ({id, body}: {id: string, body:any}) => {
                
                return {
                    method: "PUT",
                    url: `/client/${id}`,
                    body
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
    useActiveClientsQuery,
    useUpdateClientMutation
} = clientSlice;