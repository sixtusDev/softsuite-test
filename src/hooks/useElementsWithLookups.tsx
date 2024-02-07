import React, { useMemo } from 'react';
import { Spin } from 'antd';
import { useFetchElementsQuery } from '../store/apis/element.api';
import { Status } from '../components/shareds/Status';
import { withAsyncState } from '../hoc/withAsyncState';
import { useLookups } from './useLookups';

export function useElementsWithLookups() {
  const { data, isLoading: isLoadingElements, error: elementsError } = useFetchElementsQuery();
  const {
    categoryValue,
    isLoadingCategory,
    categoryError,
    classificationValue,
    isLoadingClassification,
    classificationError,
    isLoadingLookups,
    looupError,
  } = useLookups(data?.data.content);

  const reformedElements = useMemo(() => {
    if (!data?.data) return [];

    const elements = data.data.content.map((element) => {
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
      return {
        ...element,
        status: <Status value={element.status} />,
        categoryValue: <CategoryValueWithErrorAndLoader />,
        classificationValue: <ClassificationValueWithErrorAndLoader />,
      };
    });
    return elements;
  }, [data?.data, isLoadingCategory, isLoadingClassification, categoryError, classificationError]);

  return {
    isLoading: isLoadingElements || isLoadingLookups,
    error: elementsError || looupError,
    elements: reformedElements,
    total: data?.data.total,
  };
}
