import React, { useEffect, useState } from 'react';
import { Form, Select, Typography, Card, Table, Button } from 'antd';
import ProductList from './productList';
import { InventoryDocumentTypeService } from 'services/inventory/InventoryDocumentService';
import { SupplierService } from 'services/inventory/SupplierService';
import { APP_PREFIX_PATH } from 'configs/AppConfig';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;
const { Title } = Typography
const StepsContent = ({ currentStep, form, productList, onEdit, onDelete, onAdd, setDocumentTypeModalVisible }) => {
  const [movementType, setMovementType] = useState('');
  const [documentTypeList, setDocumentTypeList] = useState([])
  const [showProvider, setShowProveider] = useState(false)
  const [suppliers, setSuppliers] = useState([])
  const [dataSelected, setDataSelected] = useState(null)
  const [movementSelected, setMovementSeleted] = useState(null)
  const [supplierSelected, setSupplierSelected] = useState(null)
  const navigate = useNavigate(); // useNavigate hook for navigation
  const handleMovementTypeChange = (value) => {
    form.setFieldsValue({ movementType: value });
    const typeselected = documentTypeList.filter(w => w.id == value)
    setMovementSeleted(typeselected[0])
    if (typeselected != null && typeselected[0].class == "entrada") {
      setShowProveider(true)
    }
    else
      setShowProveider(false)
  };

  const handleSupplierSelected = (value) => {
    const supplierSelectedform = suppliers.filter(w => w.id == value)
    setSupplierSelected(supplierSelectedform[0])
  };

  const handleCreateDocumentType = () => {
    navigate(`${APP_PREFIX_PATH}/inventory/parameters/document-type`); // Redirige a la página de creación de tipo de documento
  };

  const handleNavigateSupplier = () => {
    navigate(`${APP_PREFIX_PATH}/inventory/parameters/supplier`); // Redirige a la página de creación de tipo de documento
  };

  useEffect(() => {

    const data = async () => {
      const data = await InventoryDocumentTypeService.get()
      setDocumentTypeList(data)
      const suppliersData = await SupplierService.get();
      setSuppliers(suppliersData.data)
    };
    data();

  }, []);


  const columns = [
   
    {
      title: "Producto",
      dataIndex: "product",
      key: "product",
      align: "left",
    },
    {
      title: "Bodega",
      dataIndex: "warehouse",
      key: "warehouse",
      align: "left",
    },
    {
      title: "Cantidad",
      dataIndex: "quantity",
      key: "quantity",
      align: "right",
    },
    {
      title: "Valor Total",
      dataIndex: "totalValue",
      key: "totalValue",
      align: "right",
    },
  ];

  const steps = [
    {
      title: 'Tipo de Movimiento',
      content: (
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Tipo de Movimiento"
            name="movementType"
            rules={[{ required: true, message: 'Seleccione el tipo de movimiento' }]}
          >
            <Select placeholder="Seleccione un documento" onChange={handleMovementTypeChange} >
              {documentTypeList.map((dt) => (
                <Option key={dt.id} value={dt.id}>
                  {dt.name} - {dt.description}
                </Option>
              ))}
            </Select>
            <Button
              type="link"
              onClick={handleCreateDocumentType}
            >
              + Crear Tipo de documento
            </Button>
          </Form.Item>
         
          {showProvider && (
            <Form.Item
              label="Proveedor"
              name="supplier"
              rules={[{ required: true, message: 'Seleccione el proveedor' }]}
            >
              <Select placeholder="Seleccione un proveedor" onChange={handleSupplierSelected}  >
                {suppliers.map((dt) => (
                  <Option key={dt.id} value={dt.id}>
                    {dt.companyName}
                  </Option>
                ))}
              </Select>
              <Button
              type="link"
              onClick={handleNavigateSupplier}
            >
              + Crear Proveedor
            </Button>
            </Form.Item>
          )}
        </Form>
      ),
    },
    {
      title: 'Detalles del Movimiento',
      content: (
        <div>
          {movementSelected && (
            <Card style={{ marginBottom: 16, borderRadius: 10 }}>
              <Title level={3} style={{ margin: 0 }}>
                Tipo de movimiento: {movementSelected.name}
              </Title>
            </Card>
          )}

          {supplierSelected && (
            <Card style={{ borderRadius: 10 }}>
              <Title level={4} style={{ margin: 0 }}>
                Proveedor: {supplierSelected.thirdPartyIdentification} - {supplierSelected.thirdPartyName}
              </Title>
            </Card>
          )}
          <div>
            <ProductList productList={productList} onEdit={onEdit} onDelete={onDelete} onAdd={onAdd}
              movementData={dataSelected} // Pasar el proveedor seleccionado desde formData
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Confirmación',
      content: (
        <div>
          <h3>Resumen del Movimiento</h3>
          {movementSelected && (
            <Card style={{ marginBottom: 16, borderRadius: 10 }}>
              <Title level={3} style={{ margin: 0 }}>
                Tipo de movimiento: {movementSelected.name}
              </Title>
            </Card>
          )}

          {supplierSelected && (
            <Card style={{ borderRadius: 10 }}>
              <Title level={4} style={{ margin: 0 }}>
                Proveedor: {supplierSelected.thirdPartyIdentification} - {supplierSelected.thirdPartyName}
              </Title>
            </Card>
          )}
          <Card style={{ borderRadius: 10, padding: 16 }}>

            <Table
              dataSource={productList}
              columns={columns}
              pagination={false}
              bordered
            />
          </Card>
        </div>
      ),
    },
  ];

  return <div>{steps[currentStep].content}</div>;
};

export default StepsContent;
