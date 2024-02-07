import { useEffect, useMemo } from 'react';
import { useLazyFetchElementLinkByIdQuery } from '../store/apis/elementLink.api';
import { reformElementLink, useWithValues } from './useWithValues';

export const useElementLinkWithValues = (elementId: string, elementLinkId: string) => {
  const [fetchElementLink, { data, isLoading: isLoadingElementLink, error: elementLinkError }] =
    useLazyFetchElementLinkByIdQuery();

  useEffect(() => {
    if (!elementId || !elementLinkId) return;
    fetchElementLink({ elementId, elementLinkId });
  }, [elementId, elementLinkId]);

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

  const reformedElemetLink = useMemo(() => {
    const elementLinks = data?.data;
    if (!elementLinks) return;

    return reformElementLink(elementLinks, {
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
    });
  }, [
    data?.data,
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
  ]);

  return {
    elementLink: reformedElemetLink,
    isLoading: isLoadingElementLink,
    error: elementLinkError,
  };
};
