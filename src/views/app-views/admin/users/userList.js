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
import ButtomCustom from 'components/util-components/Buttons/ButtonCustom';
import {UserAddOutlined} from "@ant-design/icons";
const { Option } = Select;
// import { fetchUsers, createUser, updateUser, deleteUser } from '../api';

const UserListForm = () => {
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
    return (<>
        <HeaderCustom title={"Usuarios"} ></HeaderCustom>
        <ResponsiveCard>
        <div>
            <div>
                
                <ButtomCustom  icon={<UserAddOutlined/>} title={'Crear Usuario'}
                route = {'/administration/users'}
                onClick={handleCreate}>
                </ButtomCustom>
            </div>
            <div>
                <DynamicTable columns={columns} fetchData={fetchData} />
            </div>
        </div>
        </ResponsiveCard>
    </>
    );
}

export default UserListForm