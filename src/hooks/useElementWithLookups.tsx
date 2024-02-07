import React, { useMemo } from 'react';
import { Spin } from 'antd';
import { useFetchElementByIdQuery } from '../store/apis/element.api';
import { useLookups } from './useLookups';
import { withAsyncState } from '../hoc/withAsyncState';

export const useElementWithLookup = (elementId: string) => {
  const {
    data,
    isLoading: isLoadingElement,
    error: elementError,
  } = useFetchElementByIdQuery(elementId);

  const {
    categoryValue,
    isLoadingCategory,
    categoryError,
    classificationValue,
    isLoadingClassification,
    classificationError,
    payrunValue,
    isLoadingPayrun,
    payrunError,
  } = useLookups(data?.data);

  const reformedElement = useMemo(() => {
    const element = data?.data;
    if (!element) return;

    const CategoryValueWithErrorAndLoader = withAsyncState(
      <span>{categoryValue ? categoryValue[element.categoryValueId]?.name : null}</span>,
      isLoadingCategory,
      categoryError,
      () => <Spin />,
    );
    const ClassificationValueWithErrorAndLoader = withAsyncState(
      <span>
        {classificationValue ? classificationValue[element.classificationValueId]?.name : null}
      </span>,
      isLoadingClassification,
      classificationError,
      () => <Spin />,
    );
    const PayrunValueWithErrorAndLoader = withAsyncState(
      <span>{payrunValue ? payrunValue[element.payRunValueId]?.name : null}</span>,
      isLoadingPayrun,
      payrunError,
      () => <Spin />,
    );

    return {
      ...element,
      categoryValue: <CategoryValueWithErrorAndLoader />,
      classificationValue: <ClassificationValueWithErrorAndLoader />,
      payrunValue: <PayrunValueWithErrorAndLoader />,
    };
  }, [data?.data, isLoadingCategory, isLoadingClassification, categoryError, classificationError]);

  return {
    element: reformedElement,
    isLoading: isLoadingElement,
    error: elementError,
  };
};
