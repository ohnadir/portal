import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        login: builder.mutation({
            query: (data) => {
                console.log(data)
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
                    url: "/user/profile"
                }
            },
            providesTags: ["user"]
        }),

    })
})

export const {
    useLoginMutation,
    useProfileQuery,
} = userSlice;