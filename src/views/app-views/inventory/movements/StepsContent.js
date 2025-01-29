import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import ProductList from './productList';
import { InventoryDocumentTypeService } from 'services/inventory/InventoryDocumentService';

const { Option } = Select;

const StepsContent = ({ currentStep, form, productList, onEdit, onDelete, onAdd }) => {
  const [movementType, setMovementType] = useState('');
  const [documentTypeList, setDocumentTypeList] = useState([])
  const [showProvider, setShowProveider] = useState(false)

  const handleMovementTypeChange = (value) => {
    const typeselected = documentTypeList.filter(w => w.id == value)
    if (typeselected != null && typeselected[0].class == "entrada") {
      setShowProveider(true)
    }
    else
      setShowProveider(false)
  };



  useEffect(() => {
    const documentTypes = async () => {
      const data = await InventoryDocumentTypeService.get()
      setDocumentTypeList(data)
    };
    documentTypes();
  }, []);


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
          </Form.Item>
          {showProvider && (
            <Form.Item
              label="Proveedor"
              name="provider"
              rules={[{ required: true, message: 'Seleccione el proveedor' }]}
            >
              <Select placeholder="Seleccione un proveedor">
                <Option value="provider1">Proveedor 1</Option>
                <Option value="provider2">Proveedor 2</Option>
                <Option value="provider3">Proveedor 3</Option>
              </Select>
            </Form.Item>
          )}
        </Form>
      ),
    },
    {
      title: 'Detalles del Movimiento',
      content: (
        <ProductList productList={productList} onEdit={onEdit} onDelete={onDelete} onAdd={onAdd} />
      ),
    },
    {
      title: 'Confirmación',
      content: (
        <div>
          <h3>Resumen del Movimiento</h3>
          <h3>{movementType}</h3>
          <ul>
            {productList.map((item) => (
              <li key={item.key}>
                {item.quantity} x {item.product} (Bodega: {item.warehouse})
              </li>
            ))}
          </ul>
        </div>
      ),
    },
  ];

  return <div>{steps[currentStep].content}</div>;
};

export default StepsContent;
