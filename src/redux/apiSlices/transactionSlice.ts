/* eslint-disable @typescript-eslint/no-explicit-any */
import statistic from "antd/es/statistic";
import { api } from "../api/baseApi";

const transactionSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        addCredit: builder.mutation({
            query: ({id, body}: {id: string, body: any}) => {
                console.log(id)
                return {
                    method: "PATCH",
                    url: `/transaction/${id}`,
                    body: body
                }
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
    useTransactionStatisticQuery
} = transactionSlice;