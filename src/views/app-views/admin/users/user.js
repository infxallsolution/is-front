// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Table, Popconfirm, Select, message } from 'antd';
import DynamicTable from 'components/app-components/Custom/table';
import { UserService } from 'services/UserService';
import { RolesService } from 'services/RolesService';
import { current } from '@reduxjs/toolkit';
import ActionsColumn from 'components/app-components/Custom/actions';
import HeaderCustom from 'components/app-components/Custom/header';
import ResponsiveCard from 'components/app-components/Custom/card';
import RowCustom from 'components/util-components/FormStyles/RowCustom';
import ColCustom from 'components/util-components/FormStyles/ColCustom';
import ButtomCustom from 'components/util-components/Buttons/ButtonCustom';
import {ArrowLeftOutlined} from "@ant-design/icons";
const { Option } = Select;

// import { fetchUsers, createUser, updateUser, deleteUser } from '../api';

const UserForm = () => {
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [creatingUser, setCreatingUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [selectValue, setSelectValue] = useState(null);
    const [showclient_system_id, setShowclient_system_id] = useState(null);
    const fetchData = async () => {
        const users = await UserService.getUsers(true);
        return { data: users, current: 1, pageSize: 10, total: 10 }

    };

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const roles = await RolesService.getRoles(true)
                setRoles(roles)
            } catch (error) {
                console.error('Failed to fetch roles:', error);
            }
        };
        fetchRoles();

    }, []);

    const createUser = async (user) => {
        return await UserService.createUser(user);

    }

    const updateUser = async (userId, user) => {
        return await UserService.updateUser(userId, user)
    }

    const deleteUser = async (userId) => {
        return await UserService.deleteUser(userId)
    }

    const handleSubmit = async () => {
        const values = await form.validateFields();

        if (editingUser) {
            await updateUser(editingUser.id, values);
        } else {
            await createUser(values);
        }

        message.success(`usuario ${editingUser ? 'actualizado' : 'creado'} con exito`)
        setUsers(await fetchData());
        handleCancel();

    };

    const handleEdit = async (user) => {
        form.setFieldsValue(user);
        setEditingUser(user);
        setCreatingUser(true);
    };

    const handleDelete = async (user) => {
        await deleteUser(user);
        setUsers(await fetchData());
        message.success(`usuario eliminado con exito`)
    };

    const handleOnChangeSelect = async (event) => {
        setSelectValue(event);
    }

    const handleCancel = () => {
        form.resetFields();
        setEditingUser(null);
        setCreatingUser(false)
    };


    const handleCreate = () => {
        handleCancel();
        setCreatingUser(true)
    };

    const columns = [
        { title: 'Username', dataIndex: 'username' },
        { title: 'Nombre', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Rol', dataIndex: 'rolename' },
        { title: 'Estado', dataIndex: 'state', render: (state) => (state ? 'Active' : 'Inactive') },
        {
            title: 'Acciones',
            render: (_, record) => (
                <ActionsColumn record={record} onEdit={handleEdit} onDelete={handleDelete} ></ActionsColumn>
            ),
        },
    ];
    return (
        <>
            <HeaderCustom title={"Registar usuario"} ></HeaderCustom>
            <ResponsiveCard>
                <div>
                    <ButtomCustom route={'/administration/userlist'} icon={<ArrowLeftOutlined/>} title={'Volver'} >
                    </ButtomCustom>
                </div>
                <div>
                    <Form
                        form={form}
                        layout="vertical"
                        name="user_form"
                        initialValues={editingUser}
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="id"
                            style={{ display: 'none' }}
                        >
                            <Input type='hidden' />
                        </Form.Item>
                        <RowCustom>
                            <ColCustom>

                                <Form.Item
                                    name="roleid"
                                    label="Rol"
                                    rules={[{ required: true, message: 'Por favor seleccione un rol!' }]}
                                >
                                    <Select placeholder="Seleccione un rol" onChange={handleOnChangeSelect} >
                                        {roles.map((role) => (
                                            <Option key={role.id} value={role.id}>
                                                {role.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </ColCustom>
                            <ColCustom>
                                <Form.Item
                                    name="username"
                                    label="Username"
                                    rules={[{ required: true, message: 'Por favor ingrese el usuario' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </ColCustom>
                        </RowCustom>
                        <RowCustom>
                            <ColCustom>
                                <Form.Item
                                    name="name"
                                    label="Nombre"
                                    rules={[{ required: true, message: 'Por favor ingrese el nombre del usuario!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </ColCustom>
                            <ColCustom>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: 'Ingrese un email!' },
                                        { type: 'email', message: 'Ingrese un email!' },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </ColCustom>
                        </RowCustom>
                        <RowCustom>
                            <ColCustom>
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[
                                        { required: true, message: 'Ingrese una contraseña' },
                                        { type: 'password', message: 'Ingrese un contraseña!' },
                                    ]}
                                >
                                    <Input type='password' />
                                </Form.Item>
                            </ColCustom>
                            <ColCustom>
                                <Form.Item
                                    name="state"
                                    label="Activo"
                                    valuePropName="checked"
                                    rules={[
                                        {  },
                                    ]}
                                >
                                    <Checkbox    ></Checkbox>
                                </Form.Item>
                            </ColCustom>
                        </RowCustom>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {editingUser ? 'Update' : 'Create'}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </ResponsiveCard>
        </>
    );
};

export default UserForm;