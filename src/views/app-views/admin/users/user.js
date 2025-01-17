// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Table, Popconfirm } from 'antd';
import DynamicTable from 'components/app-components/Custom/table';
import { UserService } from 'services/UserService';
import { current } from '@reduxjs/toolkit';
// import { fetchUsers, createUser, updateUser, deleteUser } from '../api';

const UserForm = () => {
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [creatingUser, setCreatingUser] = useState(null);

    const fetchData = async () => {
        const users = await UserService.getUsers(true);
        return { data: users, current: 1, pageSize: 10, total: 10 }

    };

    useEffect(() => {
    }, []);

    const handleSubmit = async () => {
        // const values = await form.validateFields();

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
        // form.setFieldsValue(user);
        // setEditingUser(user);
    };

    const handleDelete = async (id) => {
        // await deleteUser(id);
        // setUsers(await fetchUsers());
    };

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
        { title: 'Name', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'State', dataIndex: 'state', render: (state) => (state ? 'Active' : 'Inactive') },
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
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'Please input the username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input the name!' }]}
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
                        label=""
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