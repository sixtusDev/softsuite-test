import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, DatePicker, Form, FormInstance, Radio, Row, Space, Switch } from 'antd';

import { Modal } from '../../../../components/shareds/Modal';
import { INITIAL_STEP, Steps } from '../../../../components/shareds/Steps';
import { Button } from '../../../../components/shareds/Button';
import { Input } from '../../../../components/shareds/Input';
import { Select } from '../../../../components/shareds/Select';
import { TextArea } from '../../../../components/shareds/TextArea';
import { removeUndefinedProps } from '../../../../common/utils';
import { useAppDispatch } from '../../../../store/hooks';
import { createElement } from '../../../../store/slices/element.slice';

type ElementFormProps = {
  isModalOpen: boolean;
  onCloseModal: () => void;
};

const MAX_STEP = 1;

const stepItems = [{ title: 'Element Details' }, { title: 'Additional Details' }];

const classicationOptions = [
  { label: 'Class 1', value: 123 },
  { label: 'Class 2', value: 456 },
];
const categoryOptions = [
  { label: 'Category 1', value: 789 },
  { label: 'Category 2', value: 383 },
];
const payRunOptions = [
  { label: 'Payrun 1', value: 937 },
  { label: 'Payrun 2', value: 989 },
];
const monthOptions = [
  { label: 'January', value: 'January' },
  { label: 'February', value: 'February' },
  { label: 'March', value: 'March' },
  { label: 'April', value: 'April' },
];

export const ElementForm = ({ isModalOpen, onCloseModal }: ElementFormProps) => {
  const [currentStep, setCurrentStep] = useState(INITIAL_STEP);
  const [form1Values, setForm1Values] = useState({});

  const form1 = useRef<FormInstance | null>(null);
  const form2 = useRef<FormInstance | null>(null);

  const dispatch = useAppDispatch();

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

    const payload = {
      ...form1Values,
      ...form2Values,
      ...(form2Values.effectiveStartDate && {
        effectiveStartDate: new Date(form2Values.effectiveStartDate).toISOString(),
      }),
      ...(form2Values.effectiveEndDate && {
        effectiveEndDate: new Date(form2Values.effectiveEndDate).toISOString(),
      }),
    };
    console.log({ payload });

    try {
      await dispatch(createElement(payload));
      // onCloseModal();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = useCallback(() => {
    currentStep < MAX_STEP ? form1.current?.submit() : form2.current?.submit();
  }, [currentStep]);

  return (
    <Modal
      open={isModalOpen}
      onCancel={onCloseModal}
      closeIcon={false}
      width="700px"
      footer={[
        <Button className="Button--outline" onClick={prevStep}>
          {currentStep <= INITIAL_STEP ? 'Cancel' : 'Back'}
        </Button>,
        <Button className="Button--primary" onClick={handleSubmit}>
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
                      options={classicationOptions}
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
                  <Form.Item label="Payrun" name="payrunId" rules={[{ required: true }]}>
                    <Select className="h-45" placeholder="Select Payrun" options={payRunOptions} />
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
                  <Form.Item label="Pay Frequency" name="payFrequency" rules={[{ required: true }]}>
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
  );
};
