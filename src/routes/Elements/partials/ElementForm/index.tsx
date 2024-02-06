import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Col, DatePicker, Form, FormInstance, Radio, Row, Switch } from 'antd';
import useNotification from 'antd/es/notification/useNotification';

import { Modal } from '../../../../components/shareds/Modal';
import { INITIAL_STEP, Steps } from '../../../../components/shareds/Steps';
import { Button } from '../../../../components/shareds/Button';
import { Input } from '../../../../components/shareds/Input';
import { Select } from '../../../../components/shareds/Select';
import { TextArea } from '../../../../components/shareds/TextArea';
import { removeUndefinedProps } from '../../../../common/utils';
import {
  useFetchLookupsQuery,
  useLazyFetchLookupValuesQuery,
} from '../../../../store/apis/lookup.api';
import { useCreateElementMutation } from '../../../../store/apis/element.api';
import { SuccessModal } from '../../../../components/shareds/Modal/SuccessModal';

type ElementFormProps = {
  isModalOpen: boolean;
  onCloseModal: () => void;
};

const MAX_STEP = 1;

const stepItems = [{ title: 'Element Details' }, { title: 'Additional Details' }];

const monthOptions = [
  { label: 'January', value: 'January' },
  { label: 'February', value: 'February' },
  { label: 'March', value: 'March' },
  { label: 'April', value: 'April' },
];

const CREATE_ELEMENT_SUCCESS_MESSAGE = 'Element has been deleted successfully';
const CREATE_ELEMENT_ERROR_MESSAGE = 'Error occured deleting element';

export const ElementForm = ({ isModalOpen, onCloseModal }: ElementFormProps) => {
  const [currentStep, setCurrentStep] = useState(INITIAL_STEP);
  const [form1Values, setForm1Values] = useState<any>({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState(CREATE_ELEMENT_SUCCESS_MESSAGE);

  const form1 = useRef<FormInstance | null>(null);
  const form2 = useRef<FormInstance | null>(null);

  const { data: lookups } = useFetchLookupsQuery();
  const [fetchClassifications, { data: classifications }] = useLazyFetchLookupValuesQuery();
  const [fetchCategories, { data: categories }] = useLazyFetchLookupValuesQuery();
  const [fetchPayruns, { data: payruns }] = useLazyFetchLookupValuesQuery();
  const [createElement, { isLoading: isLoadingCreateElement }] = useCreateElementMutation();

  const [notification, contextHolder] = useNotification();

  useEffect(() => {
    if (!lookups) return;
    const classificationId = lookups['Element Classification'].id;
    const categoryId = lookups['Element Category'].id;
    const payRunId = lookups['Pay Run'].id;

    fetchClassifications(classificationId);
    fetchCategories(categoryId);
    fetchPayruns(payRunId);
  }, [lookups]);

  const classificationOptions = useMemo(
    () =>
      classifications?.map(({ name, lookupId, id }) => ({
        label: name,
        value: JSON.stringify({ classificationId: lookupId, classificationValueId: id }),
      })),
    [classifications],
  );

  const categoryOptions = useMemo(
    () =>
      categories?.map(({ name, lookupId, id }) => ({
        label: name,
        value: JSON.stringify({ categoryId: lookupId, categoryValueId: id }),
      })),
    [categories],
  );

  const payRunOptions = useMemo(
    () =>
      payruns?.map(({ name, lookupId, id }) => ({
        label: name,
        value: JSON.stringify({ payRunId: lookupId, payRunValueId: id }),
      })),
    [payruns],
  );

  const handleOpenSuccessModal = useCallback(
    () => setIsSuccessModalOpen(true),
    [isSuccessModalOpen],
  );
  const handleCloseSuccessModal = useCallback(
    () => setIsSuccessModalOpen(false),
    [isSuccessModalOpen],
  );

  const nextStep = () => {
    if (currentStep < MAX_STEP) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep >= MAX_STEP) {
      return setCurrentStep(currentStep - 1);
    }
    onCloseModal();
  };

  const onFinishForm1 = (values: any) => {
    setForm1Values(values);
    nextStep();
  };

  const onFinishForm2 = async (form2Values: any) => {
    removeUndefinedProps(form1Values);
    removeUndefinedProps(form2Values);

    const { categoryId, categoryValueId } = JSON.parse(form1Values.categoryId);
    const { classificationId, classificationValueId } = JSON.parse(form1Values.classificationId);
    const { payRunId, payRunValueId } = JSON.parse(form1Values.payRunId);

    const payload = {
      ...form1Values,
      ...form2Values,
      categoryId,
      categoryValueId,
      classificationId,
      classificationValueId,
      payRunId,
      payRunValueId,
      ...(form2Values.effectiveStartDate && {
        effectiveStartDate: new Date(form2Values.effectiveStartDate).toISOString(),
      }),
      ...(form2Values.effectiveEndDate && {
        effectiveEndDate: new Date(form2Values.effectiveEndDate).toISOString(),
      }),
    };

    const result: any = await createElement(payload);
    if (result.error) {
      return notification.error({
        message: 'Delete Element',
        description: String(result?.error?.data) || CREATE_ELEMENT_ERROR_MESSAGE,
        placement: 'topRight',
      });
    }
    onCloseModal();
    setSuccessModalMessage(result?.data?.message);
    handleOpenSuccessModal();
  };

  const handleSubmit = useCallback(() => {
    currentStep < MAX_STEP ? form1.current?.submit() : form2.current?.submit();
  }, [currentStep]);

  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={onCloseModal}
        closeIcon={false}
        width="700px"
        footer={[
          <Button className="Button--outline" onClick={prevStep}>
            {currentStep <= INITIAL_STEP ? 'Cancel' : 'Back'}
          </Button>,
          <Button
            className="Button--primary"
            onClick={handleSubmit}
            loading={isLoadingCreateElement}
          >
            {currentStep >= MAX_STEP ? 'Create New Element' : 'Next'}
          </Button>,
        ]}
      >
        <div>
          <h1 className="form-heading mb-50">Create Element</h1>
          <Steps current={currentStep} items={stepItems} />

          <div className="mt-30 mb-30">
            {currentStep === 0 ? (
              <Form
                layout="vertical"
                ref={(instance) => {
                  form1.current = instance;
                }}
                onFinish={onFinishForm1}
              >
                <Row gutter={20} style={{ marginBottom: '15px' }}>
                  <Col span={12}>
                    <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                      <Input placeholder="Name" className="h-45" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Element Classification"
                      name="classificationId"
                      rules={[{ required: true }]}
                    >
                      <Select
                        className="h-45"
                        placeholder="Select Classification"
                        options={classificationOptions}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20} style={{ marginBottom: '15px' }}>
                  <Col span={12}>
                    <Form.Item
                      label="Element Category"
                      name="categoryId"
                      rules={[{ required: true }]}
                    >
                      <Select
                        className="h-45"
                        placeholder="Select Element Category"
                        options={categoryOptions}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Payrun" name="payRunId" rules={[{ required: true }]}>
                      <Select
                        className="h-45"
                        placeholder="Select Payrun"
                        options={payRunOptions}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ marginBottom: '15px' }}>
                  <Col span={24}>
                    <Form.Item label="Description" name="description">
                      <TextArea placeholder="Input Description" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ marginBottom: '15px' }}>
                  <Col span={24}>
                    <Form.Item
                      label="Reporting Name"
                      name="reportingName"
                      style={{ marginBottom: '15px' }}
                    >
                      <TextArea placeholder="Input Reporting Name" />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            ) : (
              <Form
                layout="vertical"
                ref={(instance) => {
                  form2.current = instance;
                }}
                onFinish={onFinishForm2}
              >
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
                    <Form.Item
                      label="Processing Type"
                      name="processingType"
                      rules={[{ required: true }]}
                    >
                      <div className="form-input-container">
                        <Radio.Group>
                          <Radio value="Open">Open</Radio>
                          <Radio value="Closed">Closed</Radio>
                        </Radio.Group>
                      </div>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Pay Frequency"
                      name="payFrequency"
                      rules={[{ required: true }]}
                    >
                      <div className="form-input-container">
                        <Radio.Group>
                          <Radio value="Monthly">Monthly</Radio>
                          <Radio value="Selected Months">Selected Months</Radio>
                        </Radio.Group>
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label="Selected Pay Months"
                  name="selectedMonths"
                  style={{ marginBottom: '15px' }}
                >
                  <Select
                    placeholder="Input Reporting Name"
                    mode="multiple"
                    className="h-45"
                    options={monthOptions}
                  />
                </Form.Item>
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
              </Form>
            )}
          </div>
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
