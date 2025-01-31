import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Checkbox, message, Popconfirm } from 'antd';
import { InventoryDocumentTypeService } from 'services/inventory/InventoryDocumentService';  // Servicio para gestionar los tipos de documentos de inventario
import DynamicTable from 'components/app-components/Custom/table';
import { useNavigate, useLocation } from 'react-router-dom';

const { Option } = Select;

const InventoryDocumentTypeForm = () => {
    const [form] = Form.useForm();
    const [documentTypes, setDocumentTypes] = useState([]);
    const [editingDocumentType, setEditingDocumentType] = useState(null);
    const [creatingDocumentType, setCreatingDocumentType] = useState(false);
    const navigate = useNavigate(); // useNavigate hook for navigation
    const location = useLocation(); // Nos da la ubicación actual de la ruta
    const lastVisited = location.pathname;

    const fetchData = async () => {
        const data = await InventoryDocumentTypeService.get();
        setDocumentTypes(data);
        return { data, total: data.length };  // Puedes ajustar esto según el formato de la respuesta de tu API
    };

    const handleGoBack = () => {
        navigate(-1); // Redirige a la página anterior
    };

    const createDocumentType = async (documentType) => {
        return await InventoryDocumentTypeService.createDocumentType(documentType);
    };

    const updateDocumentType = async (documentTypeId, documentType) => {
        return await InventoryDocumentTypeService.updateDocumentType(documentTypeId, documentType);
    };

    const deleteDocumentType = async (documentTypeId) => {
        await InventoryDocumentTypeService.deleteDocumentType(documentTypeId);
        message.success('Tipo de documento eliminado con éxito');
        fetchData();
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchData();
        }

        loadData()

    }, []);

    const handleSubmit = async () => {
        const values = await form.validateFields();
        let response = null;

        if (editingDocumentType) {
            response = await updateDocumentType(editingDocumentType.id, values);
        } else {
            response = await createDocumentType(values);
        }

        message.success(`Tipo de documento ${editingDocumentType ? 'actualizado' : 'creado'} con éxito`);
        setDocumentTypes(await fetchData());
        handleCancel();
    };

    const handleEdit = (documentType) => {
        form.setFieldsValue(documentType);
        setEditingDocumentType(documentType);
        setCreatingDocumentType(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setEditingDocumentType(null);
        setCreatingDocumentType(false);
    };

    const handleCreate = () => {
        setCreatingDocumentType(true);
        handleCancel();
    };

    const handleDelete = () => {
    };

    const columns = [
        { title: 'Nombre', dataIndex: 'name' },
        { title: 'Descripción', dataIndex: 'description' },
        { title: 'Clase', dataIndex: 'class' },
        { title: 'Signo', dataIndex: 'sign' },
        {
            title: 'Acciones',
            render: (_, record) => (
                <span>
                    <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>Editar</Button>
                    <Popconfirm title="¿Estás seguro de eliminar?" onConfirm={() => handleDelete(record)}>
                        <Button type="danger">Eliminar</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    return (


        creatingDocumentType ? (
            <div>
                <h1>{editingDocumentType ? 'Editar Tipo de Documento' : 'Crear Tipo de Documento'}</h1>


                <Form
                    form={form}
                    layout="vertical"
                    name="document_type_form"
                    initialValues={editingDocumentType}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="name"
                        label="Nombre"
                        rules={[{ required: true, message: 'Por favor ingrese el nombre del tipo de documento!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Descripción">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="class"
                        label="Clase"
                        rules={[{ required: true, message: 'Por favor seleccione una clase!' }]}
                    >
                        <Select>
                            <Option value="entrada">Entrada</Option>
                            <Option value="salida">Salida</Option>
                            <Option value="devolucion">Devolución</Option>
                            <Option value="ajuste a cantidad">Ajuste a Cantidad</Option>
                            <Option value="ajuste a valor">Ajuste a Valor</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="static" label="Estado Estático" valuePropName="checked">
                        <Checkbox></Checkbox>
                    </Form.Item>
                    <Form.Item
                        name="sign"
                        label="Firma"
                        rules={[{ required: true, message: 'Por favor seleccione una firma!' }]}
                    >
                        <Select>
                            <Option value="positive">Positiva</Option>
                            <Option value="negative">Negativa</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingDocumentType ? 'Actualizar' : 'Crear'}
                        </Button>
                        <Button onClick={handleCancel} style={{ marginLeft: 10 }}>
                            Cancelar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        ) : (
            <div>
                < Button type="link" onClick={handleGoBack} > Regresar </Button>
                <div>
                <Button onClick={handleCreate}>Crear Tipo de Documento</Button>
                <DynamicTable columns={columns} fetchData={fetchData} />
                </div>
            </div>
        )
    );
};

export default InventoryDocumentTypeForm;
