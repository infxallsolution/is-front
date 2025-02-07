// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Table, Popconfirm, Select, message } from 'antd';
import ActionsColumn from 'components/app-components/Custom/actions';
import HeaderCustom from 'components/app-components/Custom/header';
import ResponsiveCard from 'components/app-components/Custom/card';
import RowCustom from 'components/util-components/FormStyles/RowCustom';
import ColCustom from 'components/util-components/FormStyles/ColCustom';
import ButtomCustom from 'components/util-components/Buttons/ButtonCustom';
import { ArrowLeftOutlined } from "@ant-design/icons";
const { Option } = Select;

// import { fetchUsers, createUser, updateUser, deleteUser } from '../api';

const UserForm = ({ handleCancel, handleSubmit, roles, editData }) => {
    const [form] = Form.useForm();
    const [dataForm, setDataForm] = useState({state:true});
   
    return (
        <>
            <HeaderCustom title={"Registrar usuario"} ></HeaderCustom>
            <ButtomCustom onClick={() => handleCancel(form)} icon={<ArrowLeftOutlined />} title={'Volver'} >
            </ButtomCustom>
            <div>
                <Form
                    form={form}
                    layout="vertical"
                    name="user_form"
                    initialValues={editData ? editData:dataForm}
                    onFinish={() => handleSubmit(form)}
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
                                <Select placeholder="Seleccione un rol">
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
                         { !editData ?
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
                        </ColCustom>:<></>
                        }
                        <ColCustom>
                            <Form.Item
                                name="state"
                                label="Activo"
                                valuePropName="checked"
                            >
                                <Checkbox    ></Checkbox>
                            </Form.Item>
                        </ColCustom>
                    </RowCustom>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editData ? 'Actualizar' : 'Crear'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default UserForm;