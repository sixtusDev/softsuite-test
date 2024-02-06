import { commonApi } from '../common.api';

export type SubOrganization = {
  id: string;
  name: string;
  note: string;
  createdAt: string;
};

export type Department = {
  id: string;
  name: string;
  note: string;
  suborganizationId: string;
  createdAt: string;
};

export const subOrganizationApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    fetchSubOrganizations: build.query<SubOrganization[], void>({
      query: () => 'suborganizations',
      transformResponse: (response: { data: SubOrganization[] }) => response.data,
    }),
    fetchDepartments: build.query<Department[], string>({
      query: (subOrganizationId) => `suborganizations/${subOrganizationId}/departments`,
      transformResponse: (response: { data: Department[] }) => response.data,
    }),
  }),
});

export const { useFetchSubOrganizationsQuery, useLazyFetchDepartmentsQuery } = subOrganizationApi;
