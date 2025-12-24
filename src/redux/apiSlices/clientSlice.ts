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
        checkUsername: builder.mutation({
            query: (data) => {
                return {
                    method: "PUT",
                    url: "/user",
                    body: data
                }
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
            query: ({id, page, fromDate, toDate, search, limit}: {id: string, page: number, limit:number, fromDate?:string, toDate?:string, search?: string}) => {
                const params = new URLSearchParams()
                if (page) params.append("page", page.toString());
                if (search) params.append("searchTerm", search);
                if (fromDate) params.append("fromDate", fromDate);
                if (toDate) params.append("toDate", toDate);
                if (limit) params.append("limit", limit.toString());
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
        deleteClient: builder.mutation({
            query: (id) => {
                return {
                    method: "DELETE",
                    url: `/client/${id}`
                }
            }
        }),
        updateClientPassword: builder.mutation({
            query: ({id, body}: {id: string, body:any}) => {
                
                return {
                    method: "POST",
                    url: `/client/${id}`,
                    body
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
        clientLogin: builder.mutation({
            query: (data) => {
                return{
                    method: "POST",
                    url: "/client/login",
                    body: data
                }
            },
            transformErrorResponse: (response: any) => {
                return response.data;
            },
        }),
        clienTransactions: builder.query({
            query: ({id, page, fromDate, toDate, searchTerm, limit}: {id: string, page: number, limit:number, fromDate?:string, toDate?:string, searchTerm?: string}) => {
                const params = new URLSearchParams()
                if (page) params.append("page", page.toString());
                if (searchTerm) params.append("searchTerm", searchTerm);
                if (fromDate) params.append("fromDate", fromDate);
                if (toDate) params.append("toDate", toDate);
                if (limit) params.append("limit", limit.toString());
                return {
                    method: "GET",
                    url: `/transaction/${id}?${params.toString()}`
                }
            },
            transformResponse(baseQueryReturnValue) {
                return baseQueryReturnValue?.data;
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
    useUpdateClientMutation,
    useCheckUsernameMutation,
    useDeleteClientMutation,
    useUpdateClientPasswordMutation,
    useClientLoginMutation,
    useClienTransactionsQuery
} = clientSlice;