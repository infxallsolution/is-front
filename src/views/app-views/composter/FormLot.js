import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  Divider,
  Select,
  Form,
  Input,
  Spin,
  Table,
  Pagination,
  DatePicker,
} from "antd";
import { message, Upload } from "antd";
import { ROW_GUTTER } from "constants/ThemeConstant";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import lotService from "../../../services/lot-service";
import storeService from "../../../services/store-service";
import productService from "../../../services/product-service";
import dayjs from "dayjs";


import { NumberOutlined } from '@ant-design/icons';



export const FormLot = () => {


  
  const [startDate, setStartDate] = useState(dayjs());

  const [userId, setUserId] = useState("")

  const [name, setName] = useState(''); 
  const server = process.env.REACT_APP_SERVER;
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const paramsURL = useParams();
  const [form] = Form.useForm();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [storeList, setStoreList] = useState([])
  const [productList, setProductList] = useState([])
  
  var date = new Date();


  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "Fecha",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Dias",
      dataIndex: "days",
      key: "days",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Saldo",
      dataIndex: "balance",
      key: "balance"
    },
    {
      title: "",
      dataIndex: "state",
      key: "state",
      render: (state, record) => (
        <Button
          type="primary"
          onClick={() => getLot(record.id)}
        > <i className="bi bi-pencil-square fa-lg m-2" />
          Editar
        </Button>
      ),
    },
  ];

  

  const listaEstados = [
    { value: true, label: "Activo" },
    { value: false, label: "Inactivo" },
  ];


  const { TextArea } = Input;


  const clearForm = () => {
    form.resetFields()
    setShowEdit(false)
  }


  const getLot = async (id) => {

    const data = await lotService.get(id)
    if (data) {
      console.log(data)
      form.setFieldValue("id", data.id);
      form.setFieldValue("name", data.name);
      form.setFieldValue("store", data.storeId);
      form.setFieldValue("product", data.productId);
      const date = dayjs(data.startDate, "YYYY-MM-DD"); 
      form.setFieldValue("startDate", date);
      form.setFieldValue("days", data.days);
      form.setFieldValue("balance", data.balance);
      form.setFieldValue("state", data.state)
      form.setFieldValue("description", data.description);
      setShowEdit(true)
    }

  };


  const getStores = async () => {
    const response = await storeService.getAllList()
    if (response) {
      setStoreList(response)
    }
  }


  const getFinalProducts = async () => {
    const response = await productService.getAllList()
    if (response) {
      setProductList(response)
    }
  }


  const onFinish = async (values) => {

    let id = values.id;
    let storeId = values.store;
    let productId = values.product;
    let name = values.name;
    let startDate = values.startDate;
    let days = values.days;
    let balance = values.balance;
    let state = values.state;
    let description = values.description;
    let consecutive = values.consecutive;
    const data = { id, storeId, productId, userId, name, startDate, days, description, state, balance, consecutive };
    if (showEdit)
      await lotService.update(data)
    else
      await lotService.insert(data)

    setShowEdit(false)
    form.setFieldValue("id", "");
    form.setFieldValue("name", "");
    form.setFieldValue("state", true);
    form.setFieldValue("description", "");
    form.setFieldValue("balance", "");
    form.setFieldValue("days", "");
    form.setFieldValue("store", "");
    setPage(1)
    fetchMovements(1, pageSize)

    message.success("Realizado")

  };


  const fetchMovements = async (page, pageSize) => {

    setLoading(true);
    try {
      const response = await lotService.list(page, pageSize);
      setData(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error("Error al obtener los movimientos:", error);
    } finally {
      setLoading(false);
    }
  };


  const rules = {
    days: [
      {
        required: true,
        message: "Por favor ingrese los días",
      },
    ],
    balance: [
      {
        required: true,
        message: "Por favor ingrese el saldo inicial",
      },
    ],
    name: [
      {
        required: true,
        message: "Por favor ingrese el nombre",
      },
    ],
    description: [
      {
        required: true,
        message: "Por favor ingrese la descripción",
      },
    ],
  };


  const generateName = async (selectedStore)=>{        
    const  response =  await lotService.getMaxConsecutive(selectedStore.id)
    const consecutive = response+1
    const lotName = `${selectedStore.name} - Lote ${consecutive}`
    form.setFieldValue("name", lotName);
    form.setFieldValue("consecutive", consecutive);    
    form.setFieldValue("description", lotName);
  }



  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || null
    if (user) {
      setUserId(user.id)
    }
    getStores()
    getFinalProducts()
    fetchMovements(page, pageSize);
  }, [page, pageSize]);


  return (
    <>
      <div className=" row ">
        <Divider orientation="left">Lotes de producción</Divider>
        <Row >
          <Col span={10} className="p-2">
            <Card style={{ overflow: 'auto', minHeight: '650px' }} >
              <div className="text-center"><h3>Datos del lote</h3></div>
              <Form
                name="productForm"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 800 }}
                onFinish={onFinish}
                initialValues={{startDate}}
                form={form}
                autoComplete="off"
              >
                <Form.Item label="Bodega" name="store"  >
                  <Select 
                  
                  onChange={(value) => {
                    const selectedStore = storeList.find((option) => option.id === value);
                    if (selectedStore) {
                      generateName(selectedStore)
                    }
                  }}

                  >
                    {storeList.map((option) => (
                      <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item label="product" name="product"  >
                  <Select  >
                    {productList.map((option) => (
                      <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>


                <Form.Item label="Id" name="id"  hidden>
                  <Input 
                  name="id"            
                  />
                </Form.Item>



                <Form.Item label="Nombre" name="name" rules={rules.name} hidden>
                  <Input 
                  name="name" 
                  placeholder="El nombre debe ser automatico enlazando bodega+id"
                  value={name}  // El valor sigue siendo controlado por el estado 'name'              
                  />
                </Form.Item>



                <Form.Item label="Fecha inicial" name="startDate" rules={rules.startDate}>
                  <DatePicker name="startDate" style={{ width: "100%" }} />
                </Form.Item>


                <Form.Item label="Dias de maduración" name="days" rules={rules.days}>
                  <Input
                    name="days"
                    prefix={<NumberOutlined className="text-primary" />}
                    placeholder="Dias de maduración"
                    type="number"
                  />
                </Form.Item>



                <Form.Item label="Saldo" name="balance" rules={rules.balance}  >
                  <Input
                    name="balance"
                    prefix={<NumberOutlined className="text-primary" />}
                    placeholder="Cantidad de producto en lote"
                    type="number"
                  />
                </Form.Item>



                <Form.Item label="Consecutivo" name="consecutive" hidden >
                  <Input
                    name="consecutive"
                    type="number"
                  />
                </Form.Item>


                <Form.Item label="Estado" name="state" >
                  <Select
                    style={{ width: "100%" }}
                    options={listaEstados}
                  />

                </Form.Item>
                <Form.Item label="Descripción" name="description" rules={rules.description}>
                  <TextArea name="description" rows={2} />
                </Form.Item>

                <Spin spinning={loading}>
                  <div style={{ display: "flex", justifyContent: "right" }}  hidden={showEdit}   >
                    <Button type="primary" htmlType="submit">
                      <i className="bi bi-save fa-lg m-2" /> Guardar lote
                    </Button>
                    <Button danger className="mx-2" onClick={clearForm} >
                      <i className="bi bi-x-square fa-lg mx-2" /> Cancelar
                    </Button>

                  </div>

                  
                  <div style={{ display: "flex", justifyContent: "right" }} hidden={!showEdit}  >
                    <Button className="text-white bg-success" variant="filled" htmlType="submit" >
                      <i className="bi bi-pencil-square fa-lg m-2" />
                      Editar lote
                    </Button>
                    
                    <Button danger className="mx-2" onClick={clearForm} >
                      <i className="bi bi-x-square fa-lg mx-2" /> Cancelar
                    </Button>

                  </div>



                </Spin>

                
              </Form>
            </Card>
          </Col>







          <Col span={14} className="p-2">
            <Card style={{ overflow: 'auto', minHeight: '650px' }} >
              <Pagination
                className="text-success fw-bold"
                current={page}
                pageSize={pageSize}
                total={total}
                onChange={handlePageChange}
                pageSizeOptions={["5", "10", "20", "50"]}
                showTotal={(total) => `Total ${total} items`}
                showSizeChanger
                onShowSizeChange={(current, size) => handlePageChange(1, size)}
              />
              <Spin spinning={loading}>
                <Table
                  className="table-success"
                  dataSource={data}
                  columns={columns}
                  pagination={false}
                  rowKey="_id" // Asume que cada documento tiene un campo _id
                />
              </Spin>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default FormLot;
