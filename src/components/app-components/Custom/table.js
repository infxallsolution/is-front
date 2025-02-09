import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Input, message } from 'antd';
import ActionsColumn from './actions';
import { filter } from 'lodash';

const DynamicTable = ({ columns: initialColumns, response, handleEdit, handleDelete, handleTableChange, pagination, setPagination}) => {
  const [loading, setLoading] = useState(false);

  const columns = [
    ...initialColumns.map((col) => ({
      ...col,
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    })),
    {
      title: 'Acciones',
      fixed: "right",
      width: 100,
      key: "actions",
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],

      render: (_, record) => (
        <ActionsColumn record={record} onEdit={() => { handleEdit(record) }} onDelete={ ()=> handleDelete(record.id)} ></ActionsColumn>
      ),
    }
  ]

  console.log('pagination--->', pagination)
  console.log('datasource--->', response?.data)

  return (
    <>
      <Table
        columns={columns}
        dataSource={response?.data}
        loading={loading}
        pagination={pagination}
        bordered
        size="middle"
        scroll={{ x: 'max-content' }} 
        onChange={handleTableChange}
      />
    </>
  );
};

export default DynamicTable;
