// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Table, Popconfirm, Select, message } from 'antd';
import DynamicTable from 'components/app-components/Custom/table';
import { UserService } from 'services/UserService';
import { RolesService } from 'services/RolesService';
import HeaderCustom from 'components/app-components/Custom/header';
import ResponsiveCard from 'components/app-components/Custom/card';
import ButtomCustom from 'components/util-components/Buttons/ButtonCustom';
import { UserAddOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import UserForm from './user';
import MessageConstant from 'constants/MessageConstant';
import SearchBar from 'components/app-components/Global/SearchBar';

import { Modal } from "antd";
import RowCustom from 'components/util-components/FormStyles/RowCustom';
import ColCustom from 'components/util-components/FormStyles/ColCustom';

const { Option } = Select;

const UserListForm = () => {
    const [form] = Form.useForm();
    const [roles, setRoles] = useState([]);
    const [creating, setCreating] = useState(null)
    const [editData, setEditData] = useState(null)
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: 0,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "50"],
        showTotal: (total) => `Total: ${total} registros`,
    });
    const [filters, setFilters] = useState({});
    const fetchData = async (page, pageSize, filters) => {
        return await UserService.get(page, pageSize, filters);
    };

    const loadTableData = async (page, pageSize, filters) => {
        setLoading(true);
        try {
            const response = await fetchData(page, pageSize, filters);
            setResponse(response);
            setPagination({
                ...pagination,
                total: response.total,  // Asegúrate de tener el total de registros
            });
        } catch (error) {
            console.error("Error al obtener datos:", error);
        } finally {
            setLoading(false);
        }
    };


    const fetchRoles = async () => {
        try {
            const roles = await RolesService.get()
            setRoles(roles)
        } catch (error) {
            console.error('Failed to fetch roles:', error);
        }
    };

    useEffect(() => {
        fetchRoles();
        loadTableData(pagination.current, pagination.pageSize);
    }, [pagination.current, pagination.pageSize]);


    //define columns
    const columns = [
        { title: 'Usuario', dataIndex: 'username' },
        { title: 'Nombre', dataIndex: 'name' },
        { title: 'Correo eléctronico', dataIndex: 'email' },
        { title: 'Rol', dataIndex: 'rolename' },
        { title: 'Estado', dataIndex: 'state', render: (state) => (state ? 'Active' : 'Inactive') },

    ];



    const handleCreating = () => {
        setCreating(true)
    };

    const handleCancel = (form) => {
        form.resetFields();
        setCreating(null)
        setEditData(null)
    };

    const handleSubmit = async (form) => {
        const values = await form.validateFields();

        Modal.confirm({
            title: "¿Estás seguro?",
            content: `Confirma que deseas ${editData ? 'Actualizar' : 'Crear'} los datos.`,
            okText: "Sí, enviar",
            cancelText: "Cancelar",
            onOk: async () => {
                try {
                    if (editData) {
                        await UserService.update(editData.id, values);
                        message.success(MessageConstant.get("EXITO-GENERAL-ACTUALIZADO"))
                    } else {
                        await UserService.create(values);
                        message.success(MessageConstant.get("EXITO-GENERAL-CREADO"))
                    }

                    await form.resetFields();
                    setCreating(null)
                    setEditData(null)
                }

                catch (ex) {
                    message.error(MessageConstant.get("ERROR-GENERAL"))
                    message.info(MessageConstant.get("INFO-NOMBRE-USUARIO"))
                }
            }

        })

    };

    const handleTableChange = async (newpagination) => {
        const { current, pageSize } = newpagination
        setPagination({
            ...pagination,
            current: current,
            pageSize: pageSize,
            total: pagination.total,  // Asegúrate de tener el total actualizado en la paginación
            showTotal: (total) => `Total: ${total} registros`
        });
    };

    const handleEdit = async (user) => {
        setEditData(user);
    };

    const handleDelete = async (userId) => {

        try {
            await UserService.delete(userId)
            message.success(MessageConstant.get("EXITO-GENERAL-ELIMINADO"))
        }
        catch (ex) {
            message.error(MessageConstant.get("ERROR-GENERAL"))
        }
    };

    // Configuración de los campos de búsqueda
    const searchFields = [
        {
            name: 'username',
            label: 'Usuario',
            type: 'input',
        },
        {
            name: 'rolename',
            label: 'Rol',
            type: 'select',
            options: roles.map(role => ({
                value: role.name,
                label: role.name
            })),
        },
    ];

    const handleSearch = (newFilters) => {
        setFilters(newFilters); // Actualiza los filtros con los valores seleccionados
    };

    return (<>
        <ResponsiveCard>
            <div>
                {
                    (creating || editData) ? <>

                        <UserForm
                            handleCancel={handleCancel}
                            roles={roles}
                            handleSubmit={handleSubmit}
                            editData={editData}
                        />  </> :
                        <>
                            <HeaderCustom title={"Usuarios"} ></HeaderCustom>
                            <SearchBar onSearch={handleSearch} />
                            <RowCustom>
                                <ColCustom>
                                    <ButtomCustom icon={<UserAddOutlined />} title={'Crear Usuario'}
                                        onClick={handleCreating}>
                                    </ButtomCustom>
                                </ColCustom>
                            </RowCustom>
                            <DynamicTable columns={columns} response={response} handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                handleTableChange={handleTableChange}
                                pagination={pagination}
                                setPagination={setPagination}
                            />
                        </>

                }
            </div>
        </ResponsiveCard>
    </>
    );
}

export default UserListForm