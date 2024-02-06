import Item from 'antd/es/list/Item';
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
  }),
});

export const { useFetchLookupsQuery, useLazyFetchLookupValuesQuery } = loopupApi;
