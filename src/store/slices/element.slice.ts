import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import request, { ERequestStatus } from '../../common/request';
import type { RootState } from '..';

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

export type ElementState = {
  elements: Element[];
  element?: Element;
  total: number;
  status: ERequestStatus;
  error: SerializedError | null;
};

const initialState: ElementState = {
  elements: [],
  total: 0,
  status: ERequestStatus.IDLE,
  error: null,
};

export const fetchElements = createAsyncThunk('element/fetchElements', async () => {
  const response = await request.get<{ data: { content: Element[]; total: number } }>('elements');
  return response;
});

export const fetchElementById = createAsyncThunk(
  '/element/fetchElementById',
  async (id: string) => {
    const response = await request.get<{ data: Element }>(`elements/${id}`);
    console.log({ response });
    return response;
  },
);

export const elementSlice = createSlice({
  name: 'element',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchElements.pending, (_state) => {
        const state = _state;
        state.status = ERequestStatus.LOADING;
      })
      .addCase(fetchElements.fulfilled, (_state, action) => {
        const state = _state;
        state.status = ERequestStatus.SUCCEEDED;
        state.elements = action.payload.data.content;
        state.total = action.payload.data.total;
        state.error = null;
      })
      .addCase(fetchElements.rejected, (_state, action) => {
        const state = _state;
        state.error = action.error;
        state.status = ERequestStatus.FAILED;
      })
      .addCase(fetchElementById.pending, (_state) => {
        const state = _state;
        state.status = ERequestStatus.LOADING;
      })
      .addCase(fetchElementById.fulfilled, (_state, action) => {
        const state = _state;
        state.status = ERequestStatus.SUCCEEDED;
        state.element = action.payload.data;
      })
      .addCase(fetchElementById.rejected, (_state, action) => {
        const state = _state;
        state.status = ERequestStatus.FAILED;
        state.error = action.error;
      });
  },
});

export const selectElementsState = ({
  elements: { status, elements, error, total },
}: RootState) => ({ elements, status, error, total });
export const selectElement = ({ elements: { element } }: RootState) => element;
export const selectAsyncState = ({ elements: { error, status } }: RootState) => ({ status, error });

export default elementSlice.reducer;
