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
} from "antd";
import { message, Upload } from "antd";
import { ROW_GUTTER } from "constants/ThemeConstant";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import productService from "../../../services/product-service";



export const FormProduct = () => {
  const server = process.env.REACT_APP_SERVER;
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const paramsURL = useParams();
  const [form] = Form.useForm();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);


  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "",
      dataIndex: "state",
      key: "state",
      render: (state, record) => (
        <Button
          type="primary"
          onClick={() => toggleState(record)}
        > <i className="bi bi-pencil-square fa-lg m-2" />
          Editar
        </Button>
      ),
    },
  ];

  const toggleState = async (record) => {
    console.log(record.id)
    getProduct(record.id)
  };



  const listaEstados = [
    { value: true, label: "Activo" },
    { value: false, label: "Inactivo" },
  ];

  const listType = [
    { value: true, label: "Si" },
    { value: false, label: "No" },
  ];

  const { TextArea } = Input;

  const getProduct = async (id) => {

    const data = await productService.get(id)
    console.log(data)
    if (data) {
      form.setFieldValue("id", data.id);
      form.setFieldValue("name", data.name);
      form.setFieldValue("state", data.state)
      form.setFieldValue("finalProduct", data.finalProduct)
      form.setFieldValue("description", data.description);
      setShowEdit(true)
    }

  };


  const onFinish = async (values) => {
    console.log("Success:", values);

    let id = values.id;
    let name = values.name;
    let state = values.state;
    let description = values.description;
    let finalProduct = values.finalProduct;
    let userId = localStorage.getItem("user_id");
    const data = { id, name, description, state, userId,finalProduct };
    if (showEdit)
      await productService.update(data)
    else
      await productService.insert(data)

    setShowEdit(false)
    form.setFieldValue("id", "");
    form.setFieldValue("name", "");
    form.setFieldValue("state", true);
    form.setFieldValue("description", "");
    setPage(1)
    fetchMovements(1, pageSize)

    message.success("Realizado")

  };


  const fetchMovements = async (page, pageSize) => {
    console.log("ingresa al fetch movements")
    setLoading(true);
    try {
      const response = await productService.list(page, pageSize);
      console.log(response.data);
      setData(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error("Error al obtener los movimientos:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchMovements(page, pageSize);
  }, [page, pageSize]);


  const rules = {
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



  return (
    <>
      <div className=" row ">
        <Divider orientation="left">Productos</Divider>
        <Row >
          <Col span={10} className="p-2">
            <Card style={{ overflow: 'auto', height: '500px' }} >
              <div className="text-center"><h3>Datos del producto</h3></div>
              <Form
                name="productForm"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 800 }}
                initialValues={{ finalProduct: true, state:true }}
                onFinish={onFinish}
                form={form}
                autoComplete="off"
              >
                <Form.Item label="id" name="id" hidden >
                  <Input name="id" readOnly={true} />
                </Form.Item>
                <Form.Item label="Nombre" name="name" rules={rules.name}>
                  <Input name="name" placeholder="Nombre del producto" />
                </Form.Item>



                <Form.Item label="Estado" name="state" >
                  <Select
                    style={{ width: "100%" }}
                    options={listaEstados}
                  />
                </Form.Item>


                <Form.Item label="Producto final" name="finalProduct" >
                  <Select
                    style={{ width: "100%" }}
                    options={listType}
                  />
                </Form.Item>


                <Form.Item label="Descripción" name="description" rules={rules.description}>
                  <TextArea name="description" rows={4} />
                </Form.Item>
                <Spin spinning={loading}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button type="primary" htmlType="submit" hidden={showEdit}  >
                      <i className="bi bi-save fa-lg m-2" /> Guardar producto
                    </Button>


                    <Button className="text-white bg-success" variant="filled" htmlType="submit" hidden={!showEdit}  >
                      <i className="bi bi-pencil-square fa-lg m-2" />
                      Editar producto
                    </Button>


                  </div>
                </Spin>
              </Form>
            </Card>
          </Col>

          <Col span={14} className="p-2">
            <Card style={{ overflow: 'auto', minHeight: '500px' }} >
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
export default FormProduct;
