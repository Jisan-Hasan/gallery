import { baseApi } from "./baseApi";

const GALLERY_URL = "/gallery";

export const galleryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getImages: build.query({
            query: (args: Record<string, any>) => ({
                url: `${GALLERY_URL}`,
                method: "GET",
                params: args,
            }),
            transformResponse: (response: any) => {
                return response.results;
            },
            providesTags: ["images"],
        }),
        swapImage: build.mutation({
            query: (args: Record<string, any>) => ({
                url: `${GALLERY_URL}/swap-serial`,
                method: "PATCH",
                body: args,
            }),
            invalidatesTags: ["images"],
        }),
    }),
});

export const { useGetImagesQuery, useSwapImageMutation } = galleryApi;
