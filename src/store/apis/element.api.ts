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
    }),
    fetchElementById: build.query<{ data: Element }, string>({
      query: (id) => `elements/${id}`,
    }),
  }),
});

export const { useFetchElementsQuery, useFetchElementByIdQuery } = ElementApi;
