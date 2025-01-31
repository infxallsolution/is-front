import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Table, Popconfirm, Select, message } from 'antd';
import DynamicTable from 'components/app-components/Custom/table';
import { SupplierService } from 'services/inventory/SupplierService';
import { ThirdPartyService } from 'services/admin/ThirdPartyService';
import { useNavigate, useLocation } from 'react-router-dom';
const { Option } = Select;

const SupplierForm = () => {
    const [form] = Form.useForm();
    const [suppliers, setSuppliers] = useState([]);
    const [editing, setEditing] = useState(null);
    const [creating, setCreating] = useState(false);
    const [thirdParties, setThirdParties] = useState([]);
     const navigate = useNavigate(); // useNavigate hook for navigation
        const location = useLocation(); // Nos da la ubicación actual de la ruta
        const lastVisited = location.pathname;

     const fetchData = async () => {
            const data = await SupplierService.get(); // Adjust the service call accordingly
            return { data: data.data, current: 1, pageSize: 10, total: 10 }; // Adjust based on actual API response
        };

    useEffect(() => {
        const fetchData = async () => {
            const data = await SupplierService.get();
            setSuppliers(data);
            const thirdPartyData = await ThirdPartyService.get();
            setThirdParties(thirdPartyData);
        };
        fetchData();
    }, []);

    const create = async (values) => {
        await SupplierService.create(values);
    };

    const update = async (id, values) => {
        await SupplierService.update(id, values);
    };

    const handleSubmit = async () => {
        const values = await form.validateFields();
        if (editing) {
            await update(editing.id, values);
        } else {
            await create(values);
        }
        message.success(`Proveedor ${editing ? 'actualizado' : 'creado'} con éxito`);
        setEditing(null);
        setCreating(false);
        form.resetFields();
        setSuppliers(await SupplierService.get());
    };

    const handleEdit = (record) => {
        form.setFieldsValue(record);
        setEditing(record);
        setCreating(true);
    };

    const handleDelete = async (id) => {
        await SupplierService.delete(id);
        setSuppliers(await SupplierService.get());
        message.success('Proveedor eliminado con éxito');
    };

    const handleCancel = () => {
        form.resetFields();
        setEditing(null);
        setCreating(false);
    };

    const handleCreate = () => {
        handleCancel();
        setCreating(true);
    };

    const columns = [
        { title: 'Empresa', dataIndex: 'companyName' },
        { title: 'Contacto', dataIndex: 'contactPerson' },
        { title: 'Tercero asociado', dataIndex: 'thirdPartyName' },
        { title: 'Estado', dataIndex: 'status', render: (state) => (state ? 'Activo' : 'Inactivo') },
        {
            title: 'Acciones',
            render: (_, record) => (
                <span>
                    <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>Editar</Button>
                    <Popconfirm title="¿Seguro que deseas eliminar?" onConfirm={() => handleDelete(record.id)}>
                        <Button type="danger">Eliminar</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    const handleGoBack = () => {
        navigate(-1); // Redirige a la página anterior
    };
    return (
        creating ? (
            <div>
                <h1>{editing ? 'Editar Proveedor' : 'Crear Proveedor'}</h1>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item name="id"><Input type='hidden' /></Form.Item>
                    <Form.Item label="Nombre de la empresa" name="companyName" rules={[{ required: true, message: 'Ingrese el nombre de la empresa' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Persona de contacto" name="contactPerson">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Tercero" name="thirdPartyId" rules={[{ required: true, message: 'Seleccione un tercero' }]}>
                        <Select placeholder="Seleccione un tercero">
                            {thirdParties.map(thirdParty => (
                                <Option key={thirdParty.id} value={thirdParty.id}>{thirdParty.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="status" valuePropName="checked">
                        <Checkbox>Activo</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">{editing ? 'Actualizar' : 'Crear'}</Button>
                        <Button onClick={handleCancel} style={{ marginLeft: 10 }}>Cancelar</Button>
                    </Form.Item>
                </Form>
            </div>
        ) : (
            <div>
                 <div>
                                < Button type="link" onClick={handleGoBack} > Regresar </Button>
                </div>
                <Button onClick={handleCreate}>Crear Proveedor</Button>
                <DynamicTable columns={columns} fetchData={fetchData}/>
            </div>
        )
    );
};

export default SupplierForm;
