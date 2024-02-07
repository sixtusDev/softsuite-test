import { commonApi } from '../common.api';

export type Lookup = {
  id: string;
  name: string;
  description: string;
  type: string;
  createdAt: string;
};

export type LookupValue = {
  id: string;
  name: string;
  description: string;
  status: string;
  lookupId: string;
  lookupName: string;
  createdAt: string;
};

export const loopupApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    fetchLookups: build.query<{ [key: string]: Lookup }, void>({
      query: () => 'lookups',
      transformResponse: (response: { data: Lookup[] }) => {
        const transformedResponse: { [key: string]: Lookup } = {};
        response.data.forEach((lookup) => {
          transformedResponse[lookup.name] = lookup;
        });

        return transformedResponse;
      },
    }),
    fetchLookupValues: build.query<LookupValue[], string>({
      query: (lookupId) => `lookups/${lookupId}/lookupvalues`,
    }),
    fetchAndNormalizeLookupValues: build.query<{ [key: string]: LookupValue }, void>({
      query: () => 'lookupvalues',
      transformResponse: (response: LookupValue[]) => {
        const transformedLookupValues: { [key: string]: LookupValue } = {};
        response.forEach((lookupValue) => {
          transformedLookupValues[lookupValue.id] = lookupValue;
        });
        return transformedLookupValues;
      },
    }),
    fetchTransformedLookupValues: build.query<{ [key: string]: LookupValue }, string>({
      query: (lookupId) => `lookups/${lookupId}/lookupvalues`,
      transformResponse: (response: LookupValue[]) => {
        const transformedResponse: { [key: string]: LookupValue } = {};
        response.forEach((lookupValue) => {
          transformedResponse[lookupValue.id] = lookupValue;
        });
        return transformedResponse;
      },
    }),
  }),
});

export const {
  useFetchLookupsQuery,
  useLazyFetchLookupValuesQuery,
  useLazyFetchTransformedLookupValuesQuery,
  useFetchAndNormalizeLookupValuesQuery,
} = loopupApi;
