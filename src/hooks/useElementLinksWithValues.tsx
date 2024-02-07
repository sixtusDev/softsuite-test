import React, { useEffect, useMemo } from 'react';
import { Spin } from 'antd';
import {
  useFetchAndNormalizaDepartmentsQuery,
  useFetchAndNormalizeSubOrganizationsQuery,
} from '../store/apis/suborganization.api';
import { useFetchElementLinksQuery } from '../store/apis/elementLink.api';
import {
  useFetchAndNormalizeGradeStepsQuery,
  useFetchAndNormalizeGradesQuery,
} from '../store/apis/grade.api';
import { useFetchAndNormalizeLookupValuesQuery } from '../store/apis/lookup.api';
import { withAsyncState } from '../hoc/withAsyncState';
import { reformElementLink, useWithValues } from './useWithValues';

export const useSubOrganization = (elementId: string) => {
  const {
    data,
    isLoading: isLoadingElementLinks,
    error: elementLinkError,
  } = useFetchElementLinksQuery(elementId);
  const {
    suborganization,
    isLoadingSubOrganization,
    subOrganizationError,
    departments,
    isLoadingDepartments,
    departmentsError,
    grades,
    isLoadingGrade,
    gradesError,
    gradeSteps,
    isLoadingGradeSteps,
    gradeStepsError,
    lookupValues,
    isLoadingLooupValues,
    loopupValuesError,
  } = useWithValues();

  const reformedElementLinks = useMemo(() => {
    const elementLinks = data?.data.content;
    if (!elementLinks) return [];

    return elementLinks.map((elementLink) =>
      reformElementLink(elementLink, {
        suborganization,
        isLoadingSubOrganization,
        subOrganizationError,
        departments,
        isLoadingDepartments,
        departmentsError,
        grades,
        isLoadingGrade,
        gradesError,
        gradeSteps,
        isLoadingGradeSteps,
        gradeStepsError,
        lookupValues,
        isLoadingLooupValues,
        loopupValuesError,
      }),
    );
  }, [
    data?.data,
    departments,
    suborganization,
    grades,
    gradeSteps,
    lookupValues,
    isLoadingSubOrganization,
    subOrganizationError,
    isLoadingDepartments,
    departmentsError,
    lookupValues,
    loopupValuesError,
    isLoadingLooupValues,
  ]);

  return {
    elementLinks: reformedElementLinks,
    isLoading: isLoadingElementLinks,
    error: elementLinkError,
    total: data?.data.total,
  };
};
