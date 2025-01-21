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
        .validateFields(['product', 'quantity', 'warehouse'])
        .then(onOk)
        .catch(() => {});
    }}
  >
    <Form layout="vertical" form={form}>
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
    </Form>
  </Modal>
);

export default ProductModal;
