import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Input, message } from 'antd';
import ActionsColumn from './actions';

const DynamicTable = ({ columns: initialColumns, fetchData, handleEdit, handleDelete }) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState({});

  // Cargar datos desde la API con paginación
  const loadData = async (page, pageSize) => {
    setLoading(true);
    try {
      const response = await fetchData({ page, pageSize });
      setData(response.data);
      setPagination({
        current: response.current,
        pageSize: response.pageSize,
        total: response.total,
      });
    } catch (error) {
      message.error('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);


  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleTableChange = (newPagination) => {
    const { current, pageSize } = newPagination;
    setPagination({
      ...pagination,
      current,
      pageSize,
    });
    loadData(current, pageSize); // Llamada al endpoint con la nueva paginación
  };

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
        <ActionsColumn record={record} onEdit={() => { handleEdit(record) }} onDelete={''} ></ActionsColumn>
      ),
    }
  ]


  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        bordered
        size="middle"
        scroll={{ x: 'max-content' }} 
      />
    </>
  );
};

export default DynamicTable;
