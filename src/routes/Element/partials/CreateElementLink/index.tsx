import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, DatePicker, Flex, Form, Radio, Row, Switch } from 'antd';
import useNotification from 'antd/es/notification/useNotification';

import {
  useFetchLookupsQuery,
  useLazyFetchLookupValuesQuery,
} from '../../../../store/apis/lookup.api';
import {
  useFetchSubOrganizationsQuery,
  useLazyFetchDepartmentsQuery,
} from '../../../../store/apis/suborganization.api';
import { useFetchGradesQuery, useLazyFetchGradeStepsQuery } from '../../../../store/apis/grade.api';
import { Modal } from '../../../../components/shareds/Modal';
import { Button } from '../../../../components/shareds/Button';
import { INITIAL_STEP, Steps } from '../../../../components/shareds/Steps';
import { Input } from '../../../../components/shareds/Input';
import { Select } from '../../../../components/shareds/Select';
import { SuccessModal } from '../../../../components/shareds/Modal/SuccessModal';
import { useCreateElementLinkMutation } from '../../../../store/apis/elementLink.api';

type CreateElementLinkProps = {
  isModalOpen: boolean;
  elementId: string;
  onCloseModal: () => void;
};

const stepItems = [
  { title: 'Staff Information' },
  { title: 'Additional Information' },
  { title: 'Processing Information' },
];

const MAX_STEP = 2;

const CREATE_ELEMENT_LINK_SUCCESS_MESSAGE = 'Element has been deleted successfully';
const CREATE_ELEMENT_LINK_ERROR_MESSAGE = 'Error occured deleting element';

export const CreateElementLink = ({
  isModalOpen,
  elementId,
  onCloseModal,
}: CreateElementLinkProps) => {
  const [currentStep, setCurrentStep] = useState(INITIAL_STEP);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState(
    CREATE_ELEMENT_LINK_SUCCESS_MESSAGE,
  );
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({
    step1: {},
    step2: {},
  });
  const [form] = Form.useForm();

  const subOrganisationValue = Form.useWatch('suborganizationId', form);
  const gradeValue = Form.useWatch('grade', form);

  const { data: lookups } = useFetchLookupsQuery();
  const { data: subOrganizations } = useFetchSubOrganizationsQuery();
  const { data: grades } = useFetchGradesQuery();
  const [fetchGradeSteps, { data: gradeSteps }] = useLazyFetchGradeStepsQuery();
  const [fetchDepartments, { data: departments }] = useLazyFetchDepartmentsQuery();
  const [fetchEmployeeCatogory, { data: emplyeeCategories }] = useLazyFetchLookupValuesQuery();
  const [fetchEmployeeType, { data: employeeTypes }] = useLazyFetchLookupValuesQuery();
  const [fetchJobTitle, { data: jobTitles }] = useLazyFetchLookupValuesQuery();
  const [fetchLocations, { data: locations }] = useLazyFetchLookupValuesQuery();
  const [fetchUnions, { data: unions }] = useLazyFetchLookupValuesQuery();
  const [createElementLink, { isLoading: isLoadingCreateElementLink }] =
    useCreateElementLinkMutation();

  const [notification, contextHolder] = useNotification();

  useEffect(() => {
    if (!lookups) return;

    const employeeCategoryId = lookups['Employee Category'].id;
    const employeeTypeId = lookups['Employee Type'].id;
    const jobTitleId = lookups['Job Title'].id;
    const locationId = lookups.Location.id;
    const unionId = lookups.Union.id;
    const wardrobeId = lookups.Wardrobe.id;
    const housingId = lookups.Housing.id;

    fetchEmployeeCatogory(employeeCategoryId);
    fetchEmployeeType(employeeTypeId);
    fetchJobTitle(jobTitleId);
    fetchLocations(locationId);
    fetchUnions(unionId);
  }, [lookups]);

  useEffect(() => {
    if (!subOrganisationValue) return;
    fetchDepartments(subOrganisationValue);
  }, [subOrganisationValue]);

  useEffect(() => {
    if (!gradeValue) return;
    fetchGradeSteps(gradeValue);
  }, [gradeValue]);

  const employeeCategoryOptions = useMemo(
    () =>
      emplyeeCategories?.map((category) => ({
        label: category.name,
        value: JSON.stringify({
          employeeCategoryId: category.lookupId,
          employeeCategoryValueId: category.id,
        }),
      })),
    [emplyeeCategories],
  );
  const employeeTypeOptions = useMemo(
    () =>
      employeeTypes?.map((employeeType) => ({
        label: employeeType.name,
        value: JSON.stringify({
          employeeTypeId: employeeType.lookupId,
          employeeTypeValueId: employeeType.id,
        }),
      })),
    [employeeTypes],
  );
  const jobTitleOptions = useMemo(
    () => jobTitles?.map((jobTitle) => ({ label: jobTitle.name, value: jobTitle.id })),
    [jobTitles],
  );
  const locationOptios = useMemo(
    () => locations?.map((location) => ({ label: location.name, value: location.id })),
    [locations],
  );
  const unionOptions = useMemo(
    () => unions?.map((union) => ({ label: union.name, value: union.id })),
    [unions],
  );
  const subOrganizationOptions = useMemo(
    () => subOrganizations?.map((subOrg) => ({ label: subOrg.name, value: subOrg.id })),
    [subOrganizations],
  );
  const departmentOptions = useMemo(
    () => departments?.map((department) => ({ label: department.name, value: department.id })),
    [departments],
  );
  const gradeOptions = useMemo(
    () => grades?.map((grade) => ({ label: grade.name, value: grade.id })),
    [grades],
  );
  const gradeStepOptions = useMemo(
    () => gradeSteps?.map((gradeStep) => ({ label: gradeStep.name, value: gradeStep.id })),
    [gradeSteps],
  );

  const handleCloseSuccessModal = useCallback(
    () => setIsSuccessModalOpen(false),
    [isSuccessModalOpen],
  );
  const handleOpenSuccessModal = useCallback(
    () => setIsSuccessModalOpen(true),
    [isSuccessModalOpen],
  );
  const handleSubmit = useCallback(async () => {
    const { employeeCategoryId, employeeCategoryValueId } = JSON.parse(
      formValues.step1.employeeCategoryId,
    );
    const { employeeTypeId, employeeTypeValueId } = JSON.parse(formValues.step1.employeeTypeId);
    const step3FormValues = form.getFieldsValue();

    const combinedFormValues = {
      ...formValues.step1,
      ...formValues.step2,
      ...step3FormValues,
      effectiveStartDate: new Date(step3FormValues.effectiveStartDate).toISOString(),
      effectiveEndDate: new Date(step3FormValues.effectiveEndDate).toISOString(),
      employeeCategoryId,
      employeeCategoryValueId,
      employeeTypeId,
      employeeTypeValueId,
    };

    const result: any = await createElementLink({ elementId, payload: combinedFormValues });
    if (result.error) {
      return notification.error({
        message: 'Delete Element',
        description: String(result?.error?.data) || CREATE_ELEMENT_LINK_ERROR_MESSAGE,
        placement: 'topRight',
      });
    }
    onCloseModal();
    setSuccessModalMessage(result?.data?.message);
    handleOpenSuccessModal();
  }, [formValues.step1, formValues.step2]);

  const prevStep = useCallback(() => {
    if (currentStep <= INITIAL_STEP) {
      onCloseModal();
      return;
    }
    setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const nextStep = useCallback(() => {
    form.validateFields().then(() => {
      switch (currentStep) {
        case 0:
          setFormValues((prevState) => ({ ...prevState, step1: form.getFieldsValue() }));
          break;
        case 1:
          setFormValues((prevState) => ({ ...prevState, step2: form.getFieldsValue() }));
          break;
        default:
          break;
      }
      if (currentStep < MAX_STEP) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    });
  }, [currentStep]);

  return (
    <>
      <Modal
        open={isModalOpen}
        forceRender
        destroyOnClose
        onCancel={onCloseModal}
        closeIcon={false}
        width="700px"
        footer={[
          <Button className="Button--outline" onClick={prevStep}>
            {currentStep <= INITIAL_STEP ? 'Cancel' : 'Back'}
          </Button>,
          <Button
            className="Button--primary"
            onClick={nextStep}
            loading={isLoadingCreateElementLink}
          >
            {currentStep >= MAX_STEP ? 'Create New Element' : 'Next'}
          </Button>,
        ]}
      >
        <div>
          <h1 className="form-heading mb-50">Create Element Link</h1>
          <Steps current={currentStep} items={stepItems} />

          <Form layout="vertical" form={form} className="mt-30 mb-30">
            {currentStep === 0 ? (
              <>
                <Form.Item
                  label="Element Link Name"
                  name="name"
                  rules={[{ required: true }]}
                  style={{ marginBottom: '15px' }}
                >
                  <Input placeholder="Name" className="h-45" />
                </Form.Item>
                <Row gutter={20} style={{ marginBottom: '15px' }}>
                  <Col span={12}>
                    <Form.Item
                      label="Suborganization"
                      name="suborganizationId"
                      rules={[{ required: true }]}
                    >
                      <Select
                        className="h-45"
                        placeholder="Select suborganization"
                        options={subOrganizationOptions}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Department" name="departmentId" rules={[{ required: true }]}>
                      <Select
                        className="h-45"
                        placeholder="Select Department"
                        options={departmentOptions}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20} style={{ marginBottom: '15px' }}>
                  <Col span={12}>
                    <Form.Item label="Job Title" name="jobTitleId" rules={[{ required: true }]}>
                      <Select
                        className="h-45"
                        placeholder="Select Job Title"
                        options={jobTitleOptions}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Location" name="locationId" rules={[{ required: true }]}>
                      <Select
                        className="h-45"
                        placeholder="Select Department"
                        options={locationOptios}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20} style={{ marginBottom: '15px' }}>
                  <Col span={12}>
                    <Form.Item
                      label="Employee Type"
                      name="employeeTypeId"
                      rules={[{ required: true }]}
                    >
                      <Select
                        className="h-45"
                        placeholder="Select Employee Type"
                        options={employeeTypeOptions}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Employee Category"
                      name="employeeCategoryId"
                      rules={[{ required: true }]}
                    >
                      <Select
                        className="h-45"
                        placeholder="Select EmployeeCategory"
                        options={employeeCategoryOptions}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            ) : currentStep === 1 ? (
              <>
                <Row gutter={20} style={{ marginBottom: '15px' }}>
                  <Col span={12}>
                    <Form.Item label="Grade" name="grade" rules={[{ required: true }]}>
                      <Select
                        className="h-45"
                        placeholder="Select a Grade"
                        options={gradeOptions}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Grade Step" name="gradeStep" rules={[{ required: true }]}>
                      <Select
                        className="h-45"
                        placeholder="Select a Grade Step"
                        options={gradeStepOptions}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      label="Union"
                      name="unionId"
                      style={{ marginBottom: '15px' }}
                      rules={[{ required: true }]}
                    >
                      <Select className="h-45" placeholder="Select Union" options={unionOptions} />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <Row gutter={20} style={{ marginBottom: '15px' }}>
                  <Col span={12}>
                    <Form.Item label="Amount Type" name="amountType" rules={[{ required: true }]}>
                      <Select
                        className="h-45"
                        placeholder="Select Job Title"
                        options={[{ label: 'Fxed', value: 'fixed' }]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
                      <Input className="h-45" placeholder="Select Department" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20} style={{ marginBottom: '15px' }}>
                  <Col span={12}>
                    <Form.Item
                      label="Effective Start Date"
                      name="effectiveStartDate"
                      rules={[{ required: true }]}
                    >
                      <DatePicker style={{ width: '100%' }} className="h-45" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Effective End Date"
                      name="effectiveEndDate"
                      rules={[{ required: true }]}
                    >
                      <DatePicker style={{ width: '100%' }} className="h-45" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20} style={{ marginBottom: '15px' }}>
                  <Col span={12}>
                    <Form.Item label="Prorate" name="prorate" rules={[{ required: true }]}>
                      <div className="form-input-container">
                        <Radio.Group>
                          <Radio value="Yes">Yes</Radio>
                          <Radio value="No">No</Radio>
                        </Radio.Group>
                      </div>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Status" name="status">
                      <div className="form-input-container">
                        <Switch />
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
          </Form>
        </div>
      </Modal>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        message={successModalMessage}
        onClose={handleCloseSuccessModal}
      />
      {contextHolder}
    </>
  );
};
