import React,{ useState } from 'react';
import { Form, Select } from 'antd';
import ProductList from './productList';

const { Option } = Select;

const StepsContent = ({ currentStep, form, productList, onEdit, onDelete, onAdd }) => {
    const [movementType, setMovementType] = useState('');

    const handleMovementTypeChange = (value) => {
      setMovementType(value); // Store selected movement type in state
    };

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
            <Select placeholder="Seleccione" onChange={handleMovementTypeChange}>
              <Option value="entrada">Entrada</Option>
              <Option value="salida">Salida</Option>
            </Select>
          </Form.Item>
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
