// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Table, Popconfirm, Select } from 'antd';
import DynamicTable from 'components/app-components/Custom/table';
import { UserService } from 'services/UserService';
import { RolesService } from 'services/RolesService';
import { current } from '@reduxjs/toolkit';
const { Option } = Select;
// import { fetchUsers, createUser, updateUser, deleteUser } from '../api';

const UserForm = () => {
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [creatingUser, setCreatingUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [selectValue, setSelectValue] = useState(null);
    const [showClientId, setShowClientId] = useState(null);
    const fetchData = async () => {
        const users = await UserService.getUsers(true);
        return { data: users, current: 1, pageSize: 10, total: 10 }

    };

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const roles = await   RolesService.getRoles()
                 setRoles(roles)
            } catch (error) {
                console.error('Failed to fetch roles:', error);
            }
        };
        fetchRoles();

    }, []);

    const handleSubmit = async () => {
        const values = await form.validateFields();

        // if (editingUser) {
        //   await updateUser(editingUser.id, values);
        // } else {
        //   await createUser(values);
        // }

        // setUsers(await fetchUsers());
        // form.resetFields();
        // setEditingUser(null);
    };

    const handleEdit = (user) => {
        form.setFieldsValue(user);
        setEditingUser(user);
        setCreatingUser(true);
    };

    const handleDelete = async (id) => {
        // await deleteUser(id);
        // setUsers(await fetchUsers());
    };

    const handleOnChangeSelect = async (event) =>{
        setSelectValue(event);
        if(event!="SuperAdministrador")
        {
            setShowClientId(true)
        }
        else
        {
            setShowClientId(null)
        }
    }

    const handleCancel = () => {
        form.resetFields();
        setEditingUser(null);
        setCreatingUser(false)
    };


    const handleCreate = () => {
        setCreatingUser(true)
    };

    const columns = [
        { title: 'Username', dataIndex: 'username' },
        { title: 'Nombre', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Estado', dataIndex: 'state', render: (state) => (state ? 'Active' : 'Inactive') },
        {
            title: 'Actions',
            render: (_, record) => (
                <span>
                    <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
                        Editar
                    </Button>
                    <Popconfirm
                        title="Estas seguro de eliminar?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button type="danger">Eliminar</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    return (
        creatingUser ? (
            <div>
                <h1>{editingUser ? 'Editar Usuarios' : 'Crear Usuarios'}</h1>
                <Form
                    form={form}
                    layout="vertical"
                    name="user_form"
                    initialValues={editingUser}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[{ required: true, message: 'Por favor seleccione un rol!' }]}
                    >
                        <Select placeholder="Seleccione un rol" onChange={handleOnChangeSelect} >
                            {roles.map((role) => (
                                <Option key={role.id} value={role.name}>
                                    {role.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'Por favor ingrese el usuario' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Nombre"
                        rules={[{ required: true, message: 'Por favor ingrese el nombre del usuario!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please input the email!' },
                            { type: 'email', message: 'Please input a valid email!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="state"
                        label="Activo"
                        valuePropName="checked"
                        rules={[{ required: true, message: 'Please check the state!' }]}
                    >
                        <Checkbox>Active</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingUser ? 'Update' : 'Create'}
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
                        Crear usuario
                    </Button>
                </div>
                <div>
                    <DynamicTable columns={columns} fetchData={fetchData} />
                </div>
            </div>)
    );
};

export default UserForm;