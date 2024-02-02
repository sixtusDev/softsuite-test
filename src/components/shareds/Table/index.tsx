import React, { useMemo } from 'react';
import { Table as AntdTable, TableProps as AntdTableProps } from 'antd';
import { v4 as uuid } from 'uuid';

import SortIcon from '../../../assets/icons/sort.svg?react';

import './Table.scss';

type TableProps<T> = {
  columns: AntdTableProps<T>['columns'];
  dataSource: T[];
};

export const Table = ({ columns, dataSource }: TableProps<any>) => {
  const dataSourceWithKeys = useMemo(
    () => dataSource.map((dataSrc) => ({ ...dataSrc, key: uuid() })),
    [dataSource],
  );

  const reformedColumns = useMemo(
    () =>
      columns?.map((col) => ({
        ...col,
        title:
          col.title !== 'Action' ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {col.title as any} <SortIcon style={{ marginLeft: '8px' }} />
            </div>
          ) : (
            col.title
          ),
      })),
    [columns],
  );

  return <AntdTable className="Table" columns={reformedColumns} dataSource={dataSourceWithKeys} />;
};
