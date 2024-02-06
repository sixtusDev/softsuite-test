import { commonApi } from '../common.api';

export type Grade = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

export type GradeStep = {
  id: string;
  name: string;
  amount: string;
  gradeId: string;
  description: string;
  createdAt: string;
};

export const subOrganizationApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    fetchGrades: build.query<Grade[], void>({
      query: () => 'suborganizations',
      transformResponse: (response: { data: Grade[] }) => response.data,
    }),
    fetchGradeSteps: build.query<GradeStep[], string>({
      query: (gradeId) => `suborganizations/${gradeId}/departments`,
      transformResponse: (response: { data: GradeStep[] }) => response.data,
    }),
  }),
});

export const { useFetchGradesQuery, useLazyFetchGradeStepsQuery } = subOrganizationApi;
