import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const commonApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json;charset=UTF-8');
      headers.set('Authorization', 'anonymous');

      return headers;
    },
  }),
  tagTypes: ['Element', 'ElementLink'],
  endpoints: (_) => ({}),
});
