import React, { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Drawer, TableProps } from 'antd';
import useNotification from 'antd/es/notification/useNotification';

import {
  ElementLink,
  useDeleteElementLinkMutation,
  useFetchElementLinksQuery,
} from '../../../../store/apis/elementLink.api';
import { MoreOptions } from '../../../../components/shareds/MoreOptions';
import { Table } from '../../../../components/shareds/Table';
import { EmptyContent } from '../../../../components/shareds/EmptyContent';
import { withAsyncState } from '../../../../hoc/withAsyncState';
import { ElementLinkDetails } from '../ElementLinkDetails';
import { DeleteModal } from '../../../../components/shareds/Modal/DeleteModal';
import { SuccessModal } from '../../../../components/shareds/Modal/SuccessModal';

import MoreIcon from '../../../../assets/icons/more.svg?react';
import ViewIcon from '../../../../assets/icons/view.svg?react';
import PencilIcon from '../../../../assets/icons/pencil.svg?react';
import BinIcon from '../../../../assets/icons/bin.svg?react';
import CheckIcon from '../../../../assets/icons/check3.svg?react';

type ElementLinksTableProps = {
  elementId: string;
};

const DELETE_ELEMENT_LINK_SUCCESS_MESSAGE = 'Element has been deleted successfully';
const DELETE_ELEMENT_LINK_ERROR_MESSAGE = 'Error occured deleting element';

export const ElementLinksTable = ({ elementId }: ElementLinksTableProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState(
    DELETE_ELEMENT_LINK_SUCCESS_MESSAGE,
  );
  const [elementLinkId, setElementLinkId] = useState('');
  const [openElementDetailsDrawer, setOpenElementDetailsDrawer] = useState(false);

  const [notification, contextHolder] = useNotification();

  const { data, isLoading, error } = useFetchElementLinksQuery(elementId);
  const [deleteElementLink, { isLoading: isLoadingDeleteElementLink }] =
    useDeleteElementLinkMutation();

  const showElementDetailsDrawer = useCallback(() => {
    setOpenElementDetailsDrawer(true);
  }, [openElementDetailsDrawer]);

  const onCLoseElementDetailsDrawer = useCallback(() => {
    setOpenElementDetailsDrawer(false);
  }, [openElementDetailsDrawer]);
  const handleOpenSuccessModal = useCallback(
    () => setIsSuccessModalOpen(true),
    [isDeleteModalOpen],
  );
  const handleCloseSuccessModal = useCallback(
    () => setIsSuccessModalOpen(false),
    [isDeleteModalOpen],
  );
  const handleOpenDeleteModal = useCallback(() => setIsDeleteModalOpen(true), [isDeleteModalOpen]);
  const handleCloseDeleteModal = useCallback(
    () => setIsDeleteModalOpen(false),
    [isDeleteModalOpen],
  );
  const handleDeleteElementLink = useCallback(async () => {
    if (elementId) {
      const result: any = await deleteElementLink({ elementId, elementLinkId });

      if (result.error) {
        return notification.error({
          message: 'Delete Element',
          description: String(result?.error?.data) || DELETE_ELEMENT_LINK_ERROR_MESSAGE,
          placement: 'topRight',
        });
      }
      handleCloseDeleteModal();
      setSuccessModalMessage(result?.data?.message);
      handleOpenSuccessModal();
    }
  }, [elementId, elementLinkId]);

  const elementTableColumns: TableProps<ElementLink>['columns'] = [
    { title: 'Name', key: uuid(), dataIndex: 'name' },
    { title: 'Sub-Organisation', key: uuid(), dataIndex: 'suborganizationId' },
    { title: 'Department', key: uuid(), dataIndex: 'departmentId' },
    { title: 'Employee Category', key: '4', dataIndex: 'employeeCategoryId' },
    { title: 'Amount', key: uuid(), dataIndex: 'amount' },
    {
      title: 'Action',
      key: uuid(),
      render: (_, elementLink) => (
        <MoreOptions
          items={[
            {
              key: uuid(),
              label: (
                <div
                  className="more-options-action"
                  onClick={() => {
                    setElementLinkId(elementLink.id);
                    showElementDetailsDrawer();
                  }}
                >
                  <ViewIcon /> <span>View Element Links</span>
                </div>
              ),
            },
            {
              key: uuid(),
              label: (
                <div className="more-options-action">
                  <PencilIcon /> <span>Edit Element Links</span>
                </div>
              ),
            },
            {
              key: uuid(),
              label: (
                <div
                  className="more-options-action danger"
                  onClick={() => {
                    setElementLinkId(elementLink.id);
                    handleOpenDeleteModal();
                  }}
                >
                  <BinIcon /> <span>Delete Element Links</span>
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
      {data && data.data.total > 0 ? (
        <Table columns={elementTableColumns} dataSource={data?.data.content || []} />
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '500px',
          }}
        >
          <EmptyContent message="There are no element links to display" />
        </div>
      )}
    </div>
  );

  const ElementLinksTableWithErrorAndLoading = withAsyncState(JSX, isLoading, error);

  return (
    <>
      <ElementLinksTableWithErrorAndLoading />
      <Drawer
        width="500px"
        zIndex={100}
        open={openElementDetailsDrawer}
        onClose={onCLoseElementDetailsDrawer}
      >
        <div>
          <h1 className="main-heading mb-20">Element Link Details</h1>
          <ElementLinkDetails
            elementId={elementId}
            elementLinkId={elementLinkId}
            openDrawer={openElementDetailsDrawer}
            onCloseDrawer={onCLoseElementDetailsDrawer}
          />
        </div>
      </Drawer>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        loading={isLoadingDeleteElementLink}
        message="Are you sure you want to delete element link?"
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteElementLink}
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
