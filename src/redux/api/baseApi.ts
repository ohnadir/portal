import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://146.190.126.8:5008";
// const baseUrl = "http://192.168.0.114:5008";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/api/v1`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: () => ({}),
    tagTypes: ["notification", "user"]
});

export const imageUrl = `${baseUrl}`;