import React, { useState, useEffect } from 'react';
import { Form, Button, Steps, message } from 'antd';
import StepsContent from './StepsContent';
import ProductModal from './productModal';

const { Step } = Steps;

const InventoryMovementForm = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [productList, setProductList] = useState([]);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Simular datos para productos y bodegas
    setWarehouses([
      { id: '1', name: 'Bodega Central' },
      { id: '2', name: 'Bodega Secundaria' },
    ]);
    setProducts([
      { id: '1', name: 'Producto A' },
      { id: '2', name: 'Producto B' },
      { id: '3', name: 'Producto C' },
    ]);
  }, []);

  const handleNext = async () => {
    try {
      if (currentStep === 0) {
        // Validar el tipo de movimiento en el primer paso
        await form.validateFields(['movementType']);
      }
      if (currentStep === 1 && productList.length === 0) {
        // Validar que haya al menos un producto en el segundo paso
        message.error('Debe agregar al menos un producto antes de continuar.');
        return;
      }
      setCurrentStep((prev) => prev + 1);
    } catch (err) {
      message.error('Por favor complete los campos requeridos antes de continuar.');
    }
  };

  const handlePrevious = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log({ products: productList });
    message.success('Movimiento registrado con éxito.');
    form.resetFields();
    setProductList([]);
    setCurrentStep(0);
  };

  const addOrUpdateProduct = (values) => {
    const { product, quantity, warehouse } = values;
    const productData = products.find((p) => p.id === product);
    const warehouseData = warehouses.find((w) => w.id === warehouse);

    if (selectedProduct) {
      setProductList((prev) =>
        prev.map((item) =>
          item.key === selectedProduct.key
            ? { key: selectedProduct.key, product: productData.name, warehouse: warehouseData.name, quantity }
            : item
        )
      );
    } else {
      setProductList((prev) => [
        ...prev,
        { key: productList.length + 1, product: productData.name, warehouse: warehouseData.name, quantity },
      ]);
    }
    setModalVisible(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Movimientos de inventarios</h1>
      <Steps current={currentStep} style={{ marginBottom: '20px' }}>
        {['Tipo de Movimiento', 'Detalles del Movimiento', 'Confirmación'].map((title, index) => (
          <Step key={index} title={title} />
        ))}
      </Steps>
      <StepsContent
        currentStep={currentStep}
        form={form}
        productList={productList}
        onEdit={(item) => {
          setSelectedProduct(item);
          form.setFieldsValue({ product: item.product, warehouse: item.warehouse, quantity: item.quantity });
          setModalVisible(true);
        }}
        onDelete={(key) => setProductList((prev) => prev.filter((item) => item.key !== key))}
        onAdd={() => {
          form.resetFields();
          setModalVisible(true);
        }}
      />
      <div style={{ marginTop: '20px' }}>
        {currentStep > 0 && <Button onClick={handlePrevious}>Anterior</Button>}
        {currentStep < 2 && <Button type="primary" onClick={handleNext}>Siguiente</Button>}
        {currentStep === 2 && <Button type="primary" onClick={handleSubmit}>Guardar Movimiento</Button>}
      </div>
      <ProductModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={(values) => addOrUpdateProduct(values)}
        form={form}
        products={products}
        warehouses={warehouses}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default InventoryMovementForm;
