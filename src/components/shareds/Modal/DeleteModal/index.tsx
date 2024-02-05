import React from 'react';
import { Flex } from 'antd';

import { Modal } from '..';
import { Button } from '../../Button';

import Bin from '../../../../assets/icons/bin2.svg?react';

import './DeletModal.scss';

type DeleteModalProps = {
  message: string;
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onDelete: () => void;
  submessage?: string;
};

export const DeleteModal = ({
  message,
  isOpen,
  loading,
  onClose,
  onDelete,
  submessage = 'You can’t reverse this action',
}: DeleteModalProps) => (
  <Modal
    className="DeleteModal"
    open={isOpen}
    width="450px"
    closeIcon={false}
    footer={[
      <Button className="Button--outline-grey" onClick={onClose}>
        Cancel
      </Button>,
      <Button loading={loading} className="Button--danger" onClick={onDelete}>
        Yes, Delete
      </Button>,
    ]}
  >
    <Flex vertical align="center" gap="15px">
      <div>
        <Bin />
      </div>
      <p className="DeleteModal__message">{message}</p>
      <p className="DeleteModal__submessage">{submessage}</p>
    </Flex>
  </Modal>
);
