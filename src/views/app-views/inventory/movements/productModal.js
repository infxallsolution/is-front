import React from 'react';
import { Form, Modal, Select, Input } from 'antd';

const { Option } = Select;

const ProductModal = ({ visible, onCancel, onOk, form, products, warehouses, selectedProduct }) => (
  <Modal
    title={selectedProduct ? 'Editar Producto' : 'Agregar Producto'}
    visible={visible}
    onCancel={onCancel}
    onOk={() => {
      form
        .validateFields(['product', 'quantity', 'price', 'warehouse','totalValue'])
        .then(onOk)
        .catch(() => {});
    }}
  >
    <Form
      layout="vertical"
      form={form}
      onValuesChange={(_, values) => {
        const { quantity, price } = values;
        if (quantity && price) {
          form.setFieldsValue({
            totalValue: quantity * price,
          });
        }
      }}
    >
      <Form.Item
        name="product"
        label="Producto"
        rules={[{ required: true, message: 'Seleccione un producto' }]}
      >
        <Select placeholder="Producto">
          {products.map((p) => (
            <Option key={p.id} value={p.id}>
              {p.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="warehouse"
        label="Bodega"
        rules={[{ required: true, message: 'Seleccione una bodega' }]}
      >
        <Select placeholder="Bodega">
          {warehouses.map((w) => (
            <Option key={w.id} value={w.id}>
              {w.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="quantity"
        label="Cantidad"
        rules={[{ required: true, message: 'Ingrese la cantidad' }]}
      >
        <Input type="number" placeholder="Cantidad" />
      </Form.Item>
      <Form.Item
        name="price"
        label="Precio Unitario"
        rules={[{ required: true, message: 'Ingrese el precio unitario' }]}
      >
        <Input type="number" placeholder="Precio Unitario" />
      </Form.Item>
      <Form.Item
        name="totalValue"
        label="Valor Total"
      >
        <Input type="number" placeholder="Valor Total" disabled />
      </Form.Item>
    </Form>
  </Modal>
);

export default ProductModal;
