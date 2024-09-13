import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginResponse } from "../models/user/ILoginResponse.ts";
import { ILoginRequest } from "../models/user/ILoginRequest.ts";
import { IProfileResponse } from "../models/user/IProfileResponse.ts";
import { IProfileRequest } from "../models/user/IProfileRequest.ts";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, Partial<ILoginRequest>>({
      query: (userData) => ({
        url: "/user/login",
        method: "POST",
        body: userData,
      }),
    }),
    updateUser: builder.mutation<IProfileResponse, Partial<IProfileRequest>>({
      query: (userData) => ({
        url: "/user/profile",
        method: "PUT",
        body: userData,
      }),
    }),
    getUserProfile: builder.mutation<IProfileResponse, Partial<void>>({
      query: () => ({
        url: "/user/profile",
        method: "POST",
      }),
    }),
  }),
});

export const { useUpdateUserMutation, useLoginMutation, useGetUserProfileMutation } = userApi;
