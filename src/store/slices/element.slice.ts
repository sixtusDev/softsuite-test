import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import request, { ERequestStatus } from '../../common/request';
import type { RootState } from '..';

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
  status: string;
  prorate: string;
  effectiveStartDate: string;
  effectiveEndDate: string;
  payFrequency: string;
  selectedMonths: string[];
  modifiedBy: string;
};

export type ElementState = {
  elements: Element[];
  status: ERequestStatus;
};

const initialState: ElementState = {
  elements: [],
  status: ERequestStatus.IDLE,
};

export const fetchElements = createAsyncThunk('element/fetchElements', async () => {
  const response = await request.get<Element[]>('elements');
  return response;
});

export const elementSlice = createSlice({
  name: 'element',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchElements.pending, (_state) => {
      const state = _state;
      state.status = ERequestStatus.LOADING;
    });
  },
});

export const selectElements = (state: RootState) => state.elements.elements;
export const selectStatus = (state: RootState) => state.elements.status;

export default elementSlice.reducer;
