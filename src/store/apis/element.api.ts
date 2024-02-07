import { commonApi } from '../common.api';

export enum Status {
  Active = 'active',
  InActive = 'inactive',
}

export type Element = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  payRunId: number;
  payRunValueId: number;
  classificationId: number;
  classificationValueId: number;
  categoryId: number;
  categoryValueId: number;
  reportingName: string;
  processingType: string;
  status: Status;
  prorate: string;
  effectiveStartDate: string;
  effectiveEndDate: string;
  payFrequency: string;
  selectedMonths: string[];
  modifiedBy: string;
};

export const ElementApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    fetchElements: build.query<{ data: { content: Element[]; total: number } }, void>({
      query: () => 'elements',
      providesTags: ['Element'],
    }),
    fetchElementById: build.query<{ data: Element }, string>({
      query: (id) => `elements/${id}`,
    }),
    deleteElement: build.mutation({
      query: (id) => ({
        url: `elements/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Element'],
    }),
    createElement: build.mutation<any, Element>({
      query: (payload: Element) => ({
        url: '/elements',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Element'],
    }),
    fetchLookupValueById: build.query({
      query: ({ lookupId, lookupValueId }) => `lookups/${lookupId}/lookupvalue/${lookupValueId}`,
    }),
  }),
});

export const {
  useFetchElementsQuery,
  useFetchElementByIdQuery,
  useFetchLookupValueByIdQuery,
  useDeleteElementMutation,
  useCreateElementMutation,
} = ElementApi;
