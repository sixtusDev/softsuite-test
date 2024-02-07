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
    fetchAndNormalizaDepartments: build.query<{ [key: string]: Department }, void>({
      query: () => 'departments',
      transformResponse: (response: { data: Department[] }) => {
        const transformedDepartments: { [key: string]: Department } = {};
        response.data.forEach((department) => {
          transformedDepartments[department.id] = department;
        });
        return transformedDepartments;
      },
    }),
    fetchAndNormalizeSubOrganizations: build.query<{ [key: string]: SubOrganization }, void>({
      query: () => 'suborganizations',
      transformResponse: (response: { data: SubOrganization[] }) => {
        const transformedSubOrganization: { [key: string]: SubOrganization } = {};
        response.data.forEach((subOrg) => {
          transformedSubOrganization[subOrg.id] = subOrg;
        });
        return transformedSubOrganization;
      },
    }),
  }),
});

export const {
  useFetchSubOrganizationsQuery,
  useLazyFetchDepartmentsQuery,
  useFetchAndNormalizeSubOrganizationsQuery,
  useFetchAndNormalizaDepartmentsQuery,
} = subOrganizationApi;
