import React, { useState, useEffect } from 'react';
import { Form, Button, Steps, message, Modal } from 'antd';
import StepsContent from './StepsContent';
import ProductModal from './productModal';
import { WarehouseService } from 'services/inventory/WarehouseService';
import { ProductService } from 'services/ProductService';
import InventoryDocumentTypeForm from '../parameters/inventoryDocument';

const { Step } = Steps;


const InventoryMovementForm = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [productList, setProductList] = useState([]);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formValues, setFormValues] = useState(null)
  const [documentTypeModalVisible, setDocumentTypeModalVisible] = useState(false);

  useEffect(() => {
    // Simular datos para productos y bodegas
    const cargarData = async () => {
      const warehouseData = await WarehouseService.get()
      const productData = await ProductService.getProducts()
      setWarehouses(
        warehouseData.data
      );
      setProducts(productData.data);
    }

    cargarData()

  }, []);

  const handleNext = async () => {
    try {
      if (currentStep === 0) {
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
    message.success('Movimiento registrado con éxito.');
    form.resetFields();
    setProductList([]);
    setCurrentStep(0);
  };

  const addOrUpdateProduct = (values) => {
    const { product, quantity, warehouse, price, totalValue } = values;
    const productData = products.find((p) => p.id === product);
    const warehouseData = warehouses.find((w) => w.id === warehouse);

    if (selectedProduct) {
      setProductList((prev) =>
        prev.map((item) =>
          item.key === selectedProduct.key
            ? {
              key: selectedProduct.key, product: productData.name, warehouse: warehouseData.name, quantity,
              price, totalValue
            }
            : item
        )
      );
    } else {
      setProductList((prev) => [
        ...prev,
        {
          key: productList.length + 1, product: productData.name, warehouse: warehouseData.name, quantity,
          price, totalValue
        },
      ]);
    }
    setModalVisible(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Movimientos de inventarios</h1>
      <Steps current={currentStep} style={{ marginBottom: '20px' }}>
        {['Tipo de Movimiento', 'Detalles del Movimiento', 'Confirmación'].map((title, index) => (
          <Step key={index} title={title}   />
        ))}
      </Steps>
      <StepsContent
        currentStep={currentStep}
        form={form}
        productList={productList}
        onEdit={(item) => {
          setSelectedProduct(item);
          form.setFieldsValue({ product: item.product, warehouse: item.warehouse, quantity: item.quantity, price: item.price, totalValue: item.totalValue });
          setModalVisible(true);
        }}
        onDelete={(key) => setProductList((prev) => prev.filter((item) => item.key !== key))}
        onAdd={() => {
          form.resetFields();
          setModalVisible(true);
        }}
        setDocumentTypeModalVisible = {setDocumentTypeModalVisible}

      />
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
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
       <Modal
        visible={documentTypeModalVisible}
        onCancel={() => setDocumentTypeModalVisible(false)}
        footer={null}
        title="Crear Tipo de Movimiento"
      >
        <InventoryDocumentTypeForm  />
      </Modal>
    </div>
  );
};

export default InventoryMovementForm;
