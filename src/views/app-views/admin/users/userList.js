// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Table, Popconfirm, Select, message } from 'antd';
import DynamicTable from 'components/app-components/Custom/table';
import { UserService } from 'services/UserService';
import { RolesService } from 'services/RolesService';
import ActionsColumn from 'components/app-components/Custom/actions';
import HeaderCustom from 'components/app-components/Custom/header';
import ResponsiveCard from 'components/app-components/Custom/card';
import ButtomCustom from 'components/util-components/Buttons/ButtonCustom';
import { UserAddOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import UserForm from './user';
import MessageConstant from 'constants/MessageConstant';
import { Modal } from "antd";

const { Option } = Select;

const UserListForm = () => {
    const [form] = Form.useForm();
    const [roles, setRoles] = useState([]);
    const [creating, setCreating] = useState(null)
    const [editData, setEditData] = useState(null)

    const fetchData = async () => {
        const users = await UserService.get();
        return { data: users, current: 1, pageSize: 10, total: 10 }

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
        fetchData();
    }, []);

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
        try {
            Modal.confirm({
                title: "¿Estás seguro?",
                content: `Confirma que deseas ${editData ? 'Actualizar' : 'Crear'} los datos.`,
                okText: "Sí, enviar",
                cancelText: "Cancelar",
                onOk: async () => {

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

            })
        }

        catch (ex) {
            message.error(MessageConstant.get("ERROR-GENERAL"))
            message.info(MessageConstant.get("INFO-NOMBRE-USUARIO"))
        }
    };

    const handleEdit = async (user) => {
        setEditData(user);
    };

    // const handleDelete = async (user) => {
    //     // await deleteUser(user);
    //     // setUsers(await fetchData());
    //     // message.success(`usuario eliminado con exito`)
    // };


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
                            <ButtomCustom icon={<UserAddOutlined />} title={'Crear Usuario'}
                                onClick={handleCreating}>
                            </ButtomCustom>
                            <DynamicTable columns={columns} fetchData={fetchData} handleEdit={handleEdit} />
                        </>

                }
            </div>
        </ResponsiveCard>
    </>
    );
}

export default UserListForm