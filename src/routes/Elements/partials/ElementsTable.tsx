import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectElementsState, fetchElements } from '../../../store/slices/element.slice';
import { withAsyncState } from '../../../hoc/withAsyncState';
import { EmptyContent } from '../../../components/shareds/EmptyContent';
import { ERequestStatus } from '../../../common/request';
import { Table } from '../../../components/shareds/Table';

const elementTableColumns = [
  { title: 'Name', key: '1', dataIndex: 'name' },
  { title: 'Element Category', key: '2', dataIndex: 'categoryValue' },
  { title: 'Element Classification', key: '3', dataIndex: 'classificationValueId' },
  { title: 'Status', key: '4', dataIndex: 'status' },
  { title: 'Date & Time Modified', key: '5', dataIndex: 'createdAt' },
  { title: 'Modified By', key: '6', dataIndex: 'modifiedBy' },
];

const ElementsTable = () => {
  const dispatch = useAppDispatch();
  const { elements, total, status } = useAppSelector(selectElementsState);

  useEffect(() => {
    if (status === ERequestStatus.IDLE) {
      dispatch(fetchElements());
    }
  }, [dispatch]);

  return (
    <div>
      {total > 0 ? (
        <Table columns={elementTableColumns} dataSource={elements} />
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
};

export const ElementsTableWithAsyncState = withAsyncState(ElementsTable, selectElementsState);
