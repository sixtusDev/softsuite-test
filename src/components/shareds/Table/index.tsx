import React, { useMemo } from 'react';
import { Table as AntdTable } from 'antd';
import { v4 as uuid } from 'uuid';

import SortIcon from '../../../assets/icons/sort.svg?react';

import './Table.scss';

type Column = {
  title: string;
  key: string | number;
  dataIndex: string;
};

type TableProps<T> = {
  columns: Column[];
  dataSource: T[];
};

export const Table = ({ columns, dataSource }: TableProps<any>) => {
  const dataSourceWithKeys = useMemo(
    () => dataSource.map((dataSrc) => ({ ...dataSrc, key: uuid() })),
    [dataSource],
  );

  const reformedColumns = useMemo(
    () =>
      columns.map((col) => ({
        ...col,
        title: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {col.title} <SortIcon style={{ marginLeft: '8px' }} />
          </div>
        ),
      })),
    [columns],
  );

  return <AntdTable className="Table" columns={reformedColumns} dataSource={dataSourceWithKeys} />;
};
