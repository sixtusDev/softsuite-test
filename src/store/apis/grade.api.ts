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
      query: () => 'grade',
      transformResponse: (response: { data: Grade[] }) => response.data,
    }),
    fetchAndNormalizeGrades: build.query<{ [key: string]: Grade }, void>({
      query: () => 'grade',
      transformResponse: (response: { data: Grade[] }) => {
        const transformedGrades: { [key: string]: Grade } = {};
        response.data.forEach((grade) => {
          transformedGrades[grade.id] = grade;
        });
        return transformedGrades;
      },
    }),
    fetchAndNormalizeGradeSteps: build.query<{ [key: string]: GradeStep }, void>({
      query: () => 'gradesteps',
      transformResponse: (response: { data: GradeStep[] }) => {
        const transformedGradeSteps: { [key: string]: GradeStep } = {};
        response.data.forEach((gradeStep) => {
          transformedGradeSteps[gradeStep.id] = gradeStep;
        });
        return transformedGradeSteps;
      },
    }),
    fetchGradeSteps: build.query<GradeStep[], string>({
      query: (gradeId) => `suborganizations/${gradeId}/departments`,
      transformResponse: (response: { data: GradeStep[] }) => response.data,
    }),
  }),
});

export const {
  useFetchGradesQuery,
  useLazyFetchGradeStepsQuery,
  useFetchAndNormalizeGradeStepsQuery,
  useFetchAndNormalizeGradesQuery,
} = subOrganizationApi;
