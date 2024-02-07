import React from 'react';
import { Spin } from 'antd';
import { ElementLink } from '../store/apis/elementLink.api';
import {
  useFetchAndNormalizeGradeStepsQuery,
  useFetchAndNormalizeGradesQuery,
} from '../store/apis/grade.api';
import { useFetchAndNormalizeLookupValuesQuery } from '../store/apis/lookup.api';
import {
  useFetchAndNormalizaDepartmentsQuery,
  useFetchAndNormalizeSubOrganizationsQuery,
} from '../store/apis/suborganization.api';
import { withAsyncState } from '../hoc/withAsyncState';

export const reformElementLink = (
  elementLink: ElementLink,
  {
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
  }: any,
) => {
  const subOrgaizationName = suborganization
    ? suborganization[elementLink.suborganizationId]?.name
    : null;
  const departmentName = departments ? departments[elementLink.departmentId]?.name : null;
  const gradeName = grades ? grades[elementLink.grade]?.name : null;
  const gradeStepName = gradeSteps ? gradeSteps[elementLink.gradeStep]?.name : null;
  const employeeCategoryName = lookupValues
    ? lookupValues[elementLink.employeeCategoryValueId]?.name
    : null;
  const employeeTypeName = lookupValues
    ? lookupValues[elementLink.employeeTypeValueId]?.name
    : null;
  const locationName = lookupValues ? lookupValues[elementLink.locationId]?.name : null;
  const jobTitleName = lookupValues ? lookupValues[elementLink.jobTitleId]?.name : null;

  const SubOrganizationNameWithErrorAndLoader = withAsyncState(
    <span>{subOrgaizationName}</span>,
    isLoadingSubOrganization,
    subOrganizationError,
    () => <Spin />,
  );
  const DepartmentNameWithErrorAndLoader = withAsyncState(
    <span>{departmentName}</span>,
    isLoadingDepartments,
    departmentsError,
    () => <Spin />,
  );
  const EmployeeCategoryWithErrorAndLoader = withAsyncState(
    <span>{employeeCategoryName}</span>,
    isLoadingLooupValues,
    loopupValuesError,
    () => <Spin />,
  );
  const GradeNameWithErrorAndLoader = withAsyncState(
    <span>{gradeName}</span>,
    isLoadingGrade,
    gradesError,
    () => <Spin />,
  );
  const GradeStepsNameWithErrorAndLoader = withAsyncState(
    <span>{gradeStepName}</span>,
    isLoadingGradeSteps,
    gradeStepsError,
    () => <Spin />,
  );
  const EmployeeTypeNameWithErrorAndLoader = withAsyncState(
    <span>{employeeTypeName}</span>,
    isLoadingLooupValues,
    loopupValuesError,
    () => <Spin />,
  );
  const LocationNameWithErrorAndLoader = withAsyncState(
    <span>{locationName}</span>,
    isLoadingLooupValues,
    loopupValuesError,
    () => <Spin />,
  );
  const JobTitleNameWithErroAndLoader = withAsyncState(
    <span>{jobTitleName}</span>,
    isLoadingLooupValues,
    loopupValuesError,
    () => <Spin />,
  );

  return {
    ...elementLink,
    subOrganizationName: <SubOrganizationNameWithErrorAndLoader />,
    departmentName: <DepartmentNameWithErrorAndLoader />,
    employeeCategoryName: <EmployeeCategoryWithErrorAndLoader />,
    gradeName: <GradeNameWithErrorAndLoader />,
    gradeStepName: <GradeStepsNameWithErrorAndLoader />,
    employeeTypeName: <EmployeeTypeNameWithErrorAndLoader />,
    locationName: <LocationNameWithErrorAndLoader />,
    jobTitleName: <JobTitleNameWithErroAndLoader />,
  };
};

export const useWithValues = () => {
  const {
    data: suborganization,
    isLoading: isLoadingSubOrganization,
    error: subOrganizationError,
  } = useFetchAndNormalizeSubOrganizationsQuery();
  const {
    data: departments,
    isLoading: isLoadingDepartments,
    error: departmentsError,
  } = useFetchAndNormalizaDepartmentsQuery();
  const {
    data: grades,
    isLoading: isLoadingGrade,
    error: gradesError,
  } = useFetchAndNormalizeGradesQuery();
  const {
    data: gradeSteps,
    isLoading: isLoadingGradeSteps,
    error: gradeStepsError,
  } = useFetchAndNormalizeGradeStepsQuery();
  const {
    data: lookupValues,
    isLoading: isLoadingLooupValues,
    error: loopupValuesError,
  } = useFetchAndNormalizeLookupValuesQuery();

  return {
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
  };
};
