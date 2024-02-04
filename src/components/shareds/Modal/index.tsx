import React from 'react';
import { Modal as AntdModal, ModalProps as AntdModalProps } from 'antd';

import './Modal.scss';

type ModalProps = AntdModalProps;

export const Modal = (props: ModalProps) => <AntdModal className="Modal" {...props} />;
