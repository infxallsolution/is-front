import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Input, message } from 'antd';

const DynamicTable = ({ columns: initialColumns, fetchData }) => {
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

  const handleEdit = (record) => {
    setEditingRecord(record);
    setForm(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (key) => {
    try {
      await fetchData({ action: 'delete', key });
      loadData(pagination.current, pagination.pageSize);
      message.success('Registro eliminado exitosamente');
    } catch {
      message.error('Error al eliminar el registro');
    }
  };

  const handleSave = async () => {
    try {
      await fetchData({ action: 'update', record: { ...editingRecord, ...form } });
      loadData(pagination.current, pagination.pageSize);
      message.success('Registro actualizado exitosamente');
      setIsModalVisible(false);
      setEditingRecord(null);
    } catch {
      message.error('Error al guardar los cambios');
    }
  };

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


  return (
    <>
      <Table
        columns={initialColumns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        onChange={handleTableChange}
        scroll={{ x: 1500, y: 300 }}
      />
      <Modal
        title="Edit Record"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        {Object.keys(form).map((key) => (
          <Input
            key={key}
            placeholder={key}
            name={key}
            value={form[key]}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
        ))}
      </Modal>
    </>
  );
};

export default DynamicTable;
