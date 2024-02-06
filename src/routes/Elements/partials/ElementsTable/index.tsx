import React, { useCallback, useMemo, useState } from 'react';
import useNotification from 'antd/es/notification/useNotification';
import { TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { withAsyncState } from '../../../../hoc/withAsyncState';
import { EmptyContent } from '../../../../components/shareds/EmptyContent';
import { Table } from '../../../../components/shareds/Table';
import { Status } from '../../../../components/shareds/Status';
import { MoreOptions } from '../../../../components/shareds/MoreOptions';
import { DeleteModal } from '../../../../components/shareds/Modal/DeleteModal';
import { SuccessModal } from '../../../../components/shareds/Modal/SuccessModal';
import {
  Element,
  useDeleteElementMutation,
  useFetchElementsQuery,
} from '../../../../store/apis/element.api';

import MoreIcon from '../../../../assets/icons/more.svg?react';
import ViewIcon from '../../../../assets/icons/view.svg?react';
import PencilIcon from '../../../../assets/icons/pencil.svg?react';
import BinIcon from '../../../../assets/icons/bin.svg?react';
import CheckIcon from '../../../../assets/icons/check3.svg?react';

const DELETE_ELEMENT_SUCCESS_MESSAGE = 'Element has been deleted successfully';
const DELETE_ELEMENT_ERROR_MESSAGE = 'Error occured deleting element';

export const ElementsTable = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState(DELETE_ELEMENT_SUCCESS_MESSAGE);
  const [elementId, setElementId] = useState('');

  const [notification, contextHolder] = useNotification();

  const { data, error, isLoading } = useFetchElementsQuery();
  const [deleteAlbum, { isLoading: isLoadingDeleteElement }] = useDeleteElementMutation();

  const reformedElements = useMemo(
    () => data?.data.content?.map((el: any) => ({ ...el, status: <Status value={el.status} /> })),
    [data?.data.content],
  );

  const handleOpenSuccessModal = useCallback(
    () => setIsSuccessModalOpen(true),
    [isSuccessModalOpen],
  );
  const handleCloseSuccessModal = useCallback(
    () => setIsSuccessModalOpen(false),
    [isSuccessModalOpen],
  );
  const handleOpenDeleteModal = useCallback(() => setIsDeleteModalOpen(true), [isDeleteModalOpen]);
  const handleCloseDeleteModal = useCallback(
    () => setIsDeleteModalOpen(false),
    [isDeleteModalOpen],
  );
  const handleDeleteElement = useCallback(async () => {
    if (elementId) {
      const result: any = await deleteAlbum(elementId);

      if (result.error) {
        return notification.error({
          message: 'Delete Element',
          description: String(result?.error?.data) || DELETE_ELEMENT_ERROR_MESSAGE,
          placement: 'topRight',
        });
      }
      handleCloseDeleteModal();
      setSuccessModalMessage(result?.data?.message);
      handleOpenSuccessModal();
    }
  }, [elementId]);

  const elementTableColumns: TableProps<Element>['columns'] = [
    { title: 'Name', key: uuid(), dataIndex: 'name' },
    { title: 'Element Category', key: uuid(), dataIndex: 'categoryValue' },
    { title: 'Element Classification', key: uuid(), dataIndex: 'classificationValueId' },
    { title: 'Status', key: uuid(), dataIndex: 'status' },
    { title: 'Date & Time Modified', key: uuid(), dataIndex: 'createdAt' },
    { title: 'Modified By', key: uuid(), dataIndex: 'modifiedBy' },
    {
      title: 'Action',
      key: uuid(),
      render: (_, element) => (
        <MoreOptions
          items={[
            {
              key: uuid(),
              label: (
                <Link to={`/${element.id}`} className="more-options-action">
                  <ViewIcon /> <span>View Element Links</span>
                </Link>
              ),
            },
            {
              key: uuid(),
              label: (
                <div className="more-options-action">
                  <PencilIcon /> <span>Edit Element</span>
                </div>
              ),
            },
            {
              key: uuid(),
              label: (
                <div
                  className="more-options-action danger"
                  onClick={() => {
                    handleOpenDeleteModal();
                    setElementId(element.id);
                  }}
                >
                  <BinIcon /> <span>Delete Element</span>
                </div>
              ),
            },
          ]}
        >
          <MoreIcon />
        </MoreOptions>
      ),
    },
  ];

  const JSX = (
    <div>
      {data?.data && data.data.total > 0 ? (
        <Table columns={elementTableColumns} dataSource={reformedElements || []} />
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '500px',
          }}
        >
          <EmptyContent message="There are no elements to display" />
        </div>
      )}
    </div>
  );

  const ElementsTableWithAsyncState = withAsyncState(JSX, isLoading, error);
  return (
    <>
      <ElementsTableWithAsyncState />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        loading={isLoadingDeleteElement}
        message="Are you sure you want to delete Element?"
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteElement}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        message={successModalMessage}
        onClose={handleCloseSuccessModal}
        Icon={CheckIcon}
      />
      {contextHolder}
    </>
  );
};
