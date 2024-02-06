import { commonApi } from '../common.api';

export type ElementLink = {
  id: string;
  name: string;
  elementId: number;
  suborganizationId: number;
  locationId: number;
  departmentId: number;
  employeeCategoryId: number;
  employeeCategoryValueId: number;
  employeeTypeId: number;
  employeeTypeValueId: number;
  jobTitleId: number;
  grade: number;
  gradeStep: number;
  unionId: number;
  amountType: string;
  amount: number;
  rate: number;
  effectiveStartDate: string;
  effectiveEndDate: string;
  status: string;
  automate: string;
  additionalInfo: [
    {
      lookupId: number;
      lookupValueId: number;
    },
  ];
};

export const ElementLinkApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    fetchElementLinks: build.query<{ data: { content: ElementLink[]; total: number } }, string>({
      query: (elementId) => `elements/${elementId}/elementlinks`,
      providesTags: ['ElementLink'],
    }),
    fetchElementLinkById: build.query<
      { data: ElementLink },
      { elementId: string; elementLinkId: string }
    >({
      query: ({ elementId, elementLinkId }) =>
        `elements/${elementId}/elementlinks/${elementLinkId}`,
    }),
    createElementLink: build.mutation<any, { elementId: string; payload: ElementLink }>({
      query: ({ elementId, payload }) => ({
        url: `/elements/${elementId}/elementlinks`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['ElementLink'],
    }),
    deleteElementLink: build.mutation({
      query: ({ elementId, elementLinkId }) => ({
        url: `elements/${elementId}/elementlinks/${elementLinkId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ElementLink'],
    }),
  }),
});

export const {
  useFetchElementLinksQuery,
  useFetchElementLinkByIdQuery,
  useLazyFetchElementLinkByIdQuery,
  useDeleteElementLinkMutation,
  useCreateElementLinkMutation,
} = ElementLinkApi;
