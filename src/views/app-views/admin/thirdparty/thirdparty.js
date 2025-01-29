// src/components/Form.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Table, Popconfirm, Select, message } from 'antd';
import DynamicTable from 'components/app-components/Custom/table';
import { ThirdPartyService } from 'services/admin/ThirdPartyService';
const { Option } = Select;


const ThirPartForm = () => {
    const [form] = Form.useForm();
    const [s, sets] = useState([]);
    const [editing, setEditing] = useState(null);
    const [creating, setCreating] = useState(null);
    const [roles, setRoles] = useState([]);
    const [selectValue, setSelectValue] = useState(null);
    const [showclient_system_id, setShowclient_system_id] = useState(null);
    const [showdv, setshowdv] = useState(false)
    const fetchData = async () => {
        const data = await ThirdPartyService.get()
        return { data: data, current: 1, pageSize: 10, total: 10 }

    };

    useEffect(() => {
        const fetchData = async () => {
           await ThirdPartyService.get();
        };
        fetchData();

    }, []);

    const create = async (values) => {
        await ThirdPartyService.create(values)
    }

    const update = async (Id,) => {
    }

    const handleClass = async (value) => {
        if(value =='juridica')
        {
            setshowdv(true)
        }
        else{
            setshowdv(false)
        }

    }

    const handleSubmit = async () => {
        const values = await form.validateFields();

        if (editing) {
            await update(editing.id, values);
        } else {
            await create(values);
        }

        message.success(`Tercero ${editing ? 'actualizado' : 'creado'} con exito`)
        sets(await fetchData());
        handleCancel();

    };

    const handleEdit = async () => {
        form.setFieldsValue();
        setEditing();
        setCreating(true);
    };

    const handleDelete = async () => {
        // await delete();
        sets(await fetchData());
        message.success(`Tercero eliminado con exito`)
    };

    const handleOnChangeSelect = async (event) => {
        setSelectValue(event);
    }

    const handleCancel = () => {
        form.resetFields();
        setEditing(null);
        setCreating(false)
    };


    const handleCreate = () => {
        handleCancel();
        setCreating(true)
    };

    const columns = [
        { title: 'Identificación', dataIndex: 'identification' },
        { title: 'Nombre', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Teléfono', dataIndex: 'phone' },
        { title: 'Dirección', dataIndex: 'address' },
        { title: 'Estado', dataIndex: 'state', render: (state) => (state ? 'Active' : 'Inactive') },
        {
            title: 'Acciones',
            render: (_, record) => (
                <span>
                    <Button disabled={record.static ? true : false} onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
                        Editar
                    </Button>
                    <Popconfirm
                        title="Estas seguro de eliminar?"
                        disabled={record.static ? true : false}
                        onConfirm={() => handleDelete(record)}
                    >
                        <Button type="danger">Eliminar</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];
    return (
        creating ? (
            <div>
                <h1>{editing ? 'Editar Terceros' : 'Crear Terceros'}</h1>
                <Form
                    form={form}
                    layout="vertical"
                    name="_form"
                    initialValues={editing}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="id"
                    >
                        <Input type='hidden' />
                    </Form.Item>
                    <Form.Item
                        label="Tipo de persona"
                        name="class"
                        rules={[{ required: true, message: 'Seleccione un tipo de persona' }]}
                    >
                        <Select placeholder="Seleccione un proveedor" onChange={ handleClass} >
                            <Option value="natural">Persona Natural</Option>
                            <Option value="juridica">Persona Jurídica</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="identification"
                        label="Identificación"
                        rules={[{ required: true, message: 'Por favor ingrese la identificación!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Nombre"
                        rules={[{ required: true, message: 'Por favor ingrese un nombre' }]}
                    >
                        <Input />
                    </Form.Item>
                    {showdv && (<Form.Item
                        name="dv"
                        label="Dígito de verificación"
                        rules={[{ required: true, message: 'Por favor ingrese el dígito de verificación!' }]}
                    >
                        <Input />
                    </Form.Item>)
                    }
                    <Form.Item
                        name="phone"
                        label="Télefono"
                        rules={[
                            { required: true, message: 'Por favor ingrese un número de télefono!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Por favor ingrese un email!' },
                            { type: 'email', message: 'Por favor ingrese un email!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Dirección"
                        rules={[
                            { required: true, message: 'Por favor ingrese una dirección!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="state"
                        label=""
                        valuePropName="checked"
                    >
                        <Checkbox>Activo</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editing ? 'Update' : 'Create'}
                        </Button>
                        <Button onClick={handleCancel} style={{ marginLeft: 10 }}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        ) :
            (<div>
                <div>
                    <Button onClick={handleCreate}>
                        Crear Tercero
                    </Button>
                </div>
                <div>
                    <DynamicTable columns={columns} fetchData={fetchData} />
                </div>
            </div>)
    );
};

export default ThirPartForm;