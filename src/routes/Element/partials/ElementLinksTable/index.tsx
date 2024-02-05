import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Drawer, Slider, TableProps } from 'antd';

import { ElementLink, useFetchElementLinksQuery } from '../../../../store/apis/elementLink.api';
import { MoreOptions } from '../../../../components/shareds/MoreOptions';

import MoreIcon from '../../../../assets/icons/more.svg?react';
import ViewIcon from '../../../../assets/icons/view.svg?react';
import PencilIcon from '../../../../assets/icons/pencil.svg?react';
import BinIcon from '../../../../assets/icons/bin.svg?react';
import { Table } from '../../../../components/shareds/Table';
import { EmptyContent } from '../../../../components/shareds/EmptyContent';
import { withAsyncState } from '../../../../hoc/withAsyncState';
import { ElementLinkDetails } from '../ElementLinkDetails';

type ElementLinksTableProps = {
  elementId: string;
};

export const ElementLinksTable = ({ elementId }: ElementLinksTableProps) => {
  const [elementLinkId, setElementLinkId] = useState('');
  const [openElementDetailsDrawer, setOpenElementDetailsDrawer] = useState(false);

  const { data, isLoading, error } = useFetchElementLinksQuery(elementId);

  const showElementDetailsDrawer = () => {
    setOpenElementDetailsDrawer(true);
  };

  const onCLoseElementDetailsDrawer = () => {
    setOpenElementDetailsDrawer(false);
  };

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
        <ElementLinkDetails
          elementId={elementId}
          elementLinkId={elementLinkId}
          openDrawer={openElementDetailsDrawer}
          onCloseDrawer={onCLoseElementDetailsDrawer}
        />
      </Drawer>
    </>
  );
};
