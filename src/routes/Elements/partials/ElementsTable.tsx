import React, { useEffect, useMemo } from 'react';
import { TableProps } from 'antd';
import { v4 as uuid } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectElementsState, fetchElements } from '../../../store/slices/element.slice';
import { withAsyncState } from '../../../hoc/withAsyncState';
import { EmptyContent } from '../../../components/shareds/EmptyContent';
import { ERequestStatus } from '../../../common/request';
import { Table } from '../../../components/shareds/Table';
import { Status } from '../../../components/shareds/Status';
import { MoreOptions } from '../../../components/shareds/MoreOptions';

import MoreIcon from '../../../assets/icons/more.svg?react';
import ViewIcon from '../../../assets/icons/view.svg?react';
import PencilIcon from '../../../assets/icons/pencil.svg?react';
import BinIcon from '../../../assets/icons/bin.svg?react';

const elementTableColumns: TableProps<Element>['columns'] = [
  { title: 'Name', key: '1', dataIndex: 'name' },
  { title: 'Element Category', key: '2', dataIndex: 'categoryValue' },
  { title: 'Element Classification', key: '3', dataIndex: 'classificationValueId' },
  { title: 'Status', key: '4', dataIndex: 'status' },
  { title: 'Date & Time Modified', key: '5', dataIndex: 'createdAt' },
  { title: 'Modified By', key: '6', dataIndex: 'modifiedBy' },
  {
    title: 'Action',
    key: '7',
    render: () => (
      <MoreOptions
        items={[
          {
            key: uuid(),
            label: (
              <div className="more-options-action">
                <ViewIcon /> <span>View Element Links</span>
              </div>
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
              <div className="more-options-action danger">
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

const ElementsTable = () => {
  const dispatch = useAppDispatch();
  const { elements, total, status } = useAppSelector(selectElementsState);

  useEffect(() => {
    if (status === ERequestStatus.IDLE) {
      dispatch(fetchElements());
    }
  }, [dispatch]);

  const reformedElements = useMemo(
    () => elements.map((el) => ({ ...el, status: <Status value={el.status} /> })),
    [elements],
  );

  return (
    <div>
      {total > 0 ? (
        <Table columns={elementTableColumns} dataSource={reformedElements} />
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
