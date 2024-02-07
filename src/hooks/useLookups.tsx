import { useEffect } from 'react';
import {
  useFetchLookupsQuery,
  useLazyFetchTransformedLookupValuesQuery,
} from '../store/apis/lookup.api';
import { Element } from '../store/apis/element.api';

export const useLookups = (data?: Element | Element[]) => {
  const { data: lookups, isLoading: isLoadingLookups, error: looupError } = useFetchLookupsQuery();

  const [fetchPayrunValue, { data: payrunValue, isLoading: isLoadingPayrun, error: payrunError }] =
    useLazyFetchTransformedLookupValuesQuery();
  const [
    fetchClassifcationValue,
    { data: classificationValue, isLoading: isLoadingClassification, error: classificationError },
  ] = useLazyFetchTransformedLookupValuesQuery();
  const [
    fetchCategoryValue,
    { data: categoryValue, isLoading: isLoadingCategory, error: categoryError },
  ] = useLazyFetchTransformedLookupValuesQuery();

  useEffect(() => {
    if (!data || !lookups) return;

    const classificationId = lookups['Element Classification'].id;
    const categoryId = lookups['Element Category'].id;
    const payrunId = lookups['Pay Run'].id;

    fetchPayrunValue(payrunId);
    fetchClassifcationValue(classificationId);
    fetchCategoryValue(categoryId);
  }, [lookups, data]);

  return {
    isLoadingLookups,
    looupError,
    payrunValue,
    isLoadingPayrun,
    payrunError,
    classificationValue,
    isLoadingClassification,
    classificationError,
    categoryValue,
    isLoadingCategory,
    categoryError,
  };
};
