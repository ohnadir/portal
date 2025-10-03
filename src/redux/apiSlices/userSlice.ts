import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        login: builder.mutation({
            query: (data) => {
                return{
                    method: "POST",
                    url: "/auth/login",
                    body: data
                }
            }
        }),
        profile: builder.query({
            query: () => {
                return{
                    method: "GET",
                    url: "/user"
                }
            },
            transformResponse: (response: any) => {
                return response.data;
            },
            providesTags: ["user"]
        }),

    })
})

export const {
    useLoginMutation,
    useProfileQuery,
} = userSlice;