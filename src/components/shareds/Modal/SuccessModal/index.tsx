import React from 'react';
import { Flex } from 'antd';

import { Modal } from '..';
import { Button } from '../../Button';

import Check from '../../../../assets/icons/check2.svg?react';

import './SuccessModal.scss';

type SuccessModalProps = {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

export const SuccessModal = ({ message, isOpen, onClose, Icon = Check }: SuccessModalProps) => (
  <Modal
    width="400px"
    className="SuccessModal"
    open={isOpen}
    closeIcon={false}
    footer={[
      <Button className="Button--primary" onClick={onClose}>
        Close to continue
      </Button>,
    ]}
  >
    <Flex vertical align="center" gap="15px">
      <div>
        <Icon />
      </div>
      <p className="SuccessModal__message">{message}</p>
    </Flex>
  </Modal>
);
