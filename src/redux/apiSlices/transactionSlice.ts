/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../api/baseApi";

const transactionSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        transactions: builder.query({
            query: ({page, search, client, date, type, limit}: {page?: number, search?: string, client?: string, date?: string, type?: string, limit?: number}) => {
                const params = new URLSearchParams()
                if (page) params.append("page", page.toString())
                if (search) params.append("searchTerm", search)
                if (client) params.append("client", client)
                if (date) params.append("date", date)
                if (type) params.append("type", type)
                if (limit) params.append("limit", limit.toString())
                return {
                    method: "GET",
                    url: `/transaction?${params.toString()}`
                }
            },
            transformResponse: (response: any) => {
                return response.data;
            }
        }),
        addCredit: builder.mutation({
            query: ({id, body}: {id: string, body: any}) => {
                return {
                    method: "PATCH",
                    url: `/transaction/${id}`,
                    body: body
                }
            }
        }),
        deleteTransaction: builder.mutation({
            query: (id: string) => {
                return {
                    method: "DELETE",
                    url: `/transaction/${id}`
                }
            }
        }),
        updateTransaction: builder.mutation({
            query: ({id, body}: {id: string, body: any}) => {
                return {
                    method: "POST",
                    url: `/transaction/${id}`,
                    body: body
                }
            },
            transformResponse: (response: any) => {
                return response.data;
            }
        }),
        addDebit: builder.mutation({
            query: ({id, body}: {id: string, body: any}) => {
                return {
                    method: "PUT",
                    url: `/transaction/${id}`,
                    body: body
                }
            },
            transformResponse: (response: any) => {
                return response.data;
            }
        }),
        transactionStatistic: builder.query({
            query: () => {
                return {
                    method: "GET",
                    url: "/transaction/statistic"
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
    useAddCreditMutation,
    useAddDebitMutation,
    useSummaryQuery,
    useTransactionStatisticQuery,
    useDeleteTransactionMutation,
    useUpdateTransactionMutation,
    useTransactionsQuery,
} = transactionSlice;