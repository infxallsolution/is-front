import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Table, Popconfirm, message, Select } from 'antd';
import DynamicTable from 'components/app-components/Custom/table';
import { WarehouseService } from 'services/inventory/WarehouseService.js';
const { Option } = Select;

const WarehouseForm = () => {
    const [form] = Form.useForm();
    const [warehouses, setWarehouses] = useState([]);
    const [editingWarehouse, setEditingWarehouse] = useState(null);
    const [creatingWarehouse, setCreatingWarehouse] = useState(false);

    const fetchData = async () => {
        const warehouses = await WarehouseService.get(); // Adjust the service call accordingly
        return { data: warehouses.data, current: 1, pageSize: 10, total: 10 }; // Adjust based on actual API response
    };

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchData();
            setWarehouses(data.data);
        };
        loadData();
    }, []);

    const createWarehouse = async (warehouse) => {
        return await WarehouseService.createWarehouse(warehouse);
    };

    const updateWarehouse = async (warehouseId, warehouse) => {
        return await WarehouseService.updateWarehouse(warehouseId, warehouse);
    };

    const deleteWarehouse = async (warehouseId) => {
        return await WarehouseService.deleteWarehouse(warehouseId);
    };

    const handleSubmit = async () => {
        const values = await form.validateFields();
        let response = null;

        if (editingWarehouse) {
            response = await updateWarehouse(editingWarehouse.id, values);
        } else {
            response = await createWarehouse(values);
        }
        console.log('response warehouse', response)
        if (response.data.success) {
            await message.success(`Bodega ${editingWarehouse ? 'actualizada' : 'creada'} con éxito`);
        }
        else {
            await message.error(`Algo no funciono bien, intentelo mas tarde`);
        }


        setWarehouses(await fetchData());
        handleCancel();
    };

    const handleEdit = async (warehouse) => {
        form.setFieldsValue(warehouse);
        setEditingWarehouse(warehouse);
        setCreatingWarehouse(true);
    };

    const handleDelete = async (warehouse) => {
        await deleteWarehouse(warehouse.id); // Assuming the warehouse has an 'id' field
        setWarehouses(await fetchData());
        handleCancel();
        message.success('Bodega eliminada con éxito');
    };

    const handleCancel = () => {
        form.resetFields();
        setEditingWarehouse(null);
        setCreatingWarehouse(false);
    };

    const handleCreate = () => {
        handleCancel();
        setCreatingWarehouse(true);
    };

    const columns = [
        { title: 'Nombre', dataIndex: 'name' },
        { title: 'Descripción', dataIndex: 'description' },
        { title: 'Estado', dataIndex: 'status', render: (status) => (status ? 'Activo' : 'Inactivo') },
        {
            title: 'Acciones',
            render: (_, record) => (
                <span>
                    <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
                        Editar
                    </Button>
                    <Popconfirm title="¿Estás seguro de eliminar?" onConfirm={() => handleDelete(record)}>
                        <Button type="danger">Eliminar</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    return (
        creatingWarehouse ? (
            <div>
                <h1>{editingWarehouse ? 'Editar Bodega' : 'Crear Bodega'}</h1>
                <Form
                    form={form}
                    layout="vertical"
                    name="warehouse_form"
                    initialValues={editingWarehouse}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="name"
                        label="Nombre"
                        rules={[{ required: true, message: 'Por favor ingrese el nombre de la bodega!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Descripción">
                        <Input />
                    </Form.Item>
                    <Form.Item name="status" label="Activo" valuePropName="checked">
                        <Checkbox></Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingWarehouse ? 'Actualizar' : 'Crear'}
                        </Button>
                        <Button onClick={handleCancel} style={{ marginLeft: 10 }}>
                            Cancelar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        ) : (
            <div>
                <Button onClick={handleCreate}>Crear bodega</Button>
                <DynamicTable columns={columns} fetchData={fetchData} />
            </div>
        )
    );
};

export default WarehouseForm;
