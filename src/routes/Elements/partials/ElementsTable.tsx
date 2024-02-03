import React, { useMemo } from 'react';
import { TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { useAppSelector } from '../../../store/hooks';
import { selectElementsState, Element, fetchElements } from '../../../store/slices/element.slice';
import { withAsyncState } from '../../../hoc/withAsyncState';
import { EmptyContent } from '../../../components/shareds/EmptyContent';
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
    render: (_, element) => (
      <MoreOptions
        items={[
          {
            key: uuid(),
            label: (
              <Link to={`/elements/${element.id}`} className="more-options-action">
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
  const { elements, total } = useAppSelector(selectElementsState);

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

export const ElementsTableWithAsyncState = withAsyncState(
  ElementsTable,
  fetchElements,
  selectElementsState,
);
