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
import reportService from "../../../services/report-service";
import movementService from "../../../services/movement-service";
import moment from "moment";
import axios from "axios";
import dayjs from "dayjs";



export const ReportMovements = () => {

 
   const [startDate, setStartDate] = useState(dayjs());
   const [endDate, setEndDate] = useState(dayjs());
 
  const server = process.env.REACT_APP_SERVER;
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const paramsURL = useParams();
  const [form] = Form.useForm();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [total, setTotal] = useState(0);

  const [recordList, setRecordList] = useState([])









  const downloadExcel = async () => {


    try {
        const response = await reportService.generateExcelMovements(startDate,endDate)
        // Crear un blob y un enlace para descargar el archivo
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'movements.xlsx'); // Nombre del archivo
        document.body.appendChild(link);
        link.click();
        link.remove();

    } catch (error) {
        console.error("Error al descargar el archivo:", error);
    }
};





  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      title: "Lote",
      dataIndex: ["lot", "name"],
      key: ["lot", "name"],
    },
    {
      title: "Producto",
      dataIndex: ["product", "name"],
      key: ["product", "name"],
    },
    {
      title: "Tipo",
      dataIndex: ["movement_type", "name"],
      key: ["movement_type", "name"],
    },
    {
      title: "Actividad",
      dataIndex: ["activity", "name"],
      key: ["activity", "name"],
    },
    {
      title: "Dias",
      dataIndex: "days",
      key: "days"
    },
    {
      title: "Kilogramos",
      dataIndex: "quantity",
      key: "quantity"
    },
        {
          title: "",
          dataIndex: "state",
          key: "state",
          render: (state, record) => (
            <Button
              danger
              onClick={() => confirmDelete(record.id)}
            > <i className="bi bi-trash fa-lg m-2" />
            
            </Button>
          ),
        },
  ];

  const confirmDelete = async (documentId)=>{
    Swal.fire({
      title: "Desea eliminar el movimiento?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Eliminar movimiento",
      denyButtonText: `Conservar`
    }).then(async (result) => {
      if (result.isConfirmed) {    
        await movementService.deleteMovement(documentId)
        message.info("Realizado")
        setPage(1)
        fetchMovements(page, pageSize)
      }
    });
  }


  const { TextArea } = Input;


  const onFinish = async (values) => {
    console.log("Success:", values);
    setPage(1)
    fetchMovements(page, pageSize)
  };




  const fetchMovements = async (page, pageSize) => {
    const start = startDate.toISOString().split("T")[0];
    const end = endDate.toISOString().split("T")[0];
    setLoading(true);
    try {
      const response = await reportService.getReportMovements(page, pageSize, start, end)
      if (response.success) {
        console.log(response.data)
        setRecordList(response.data)
        setTotal(response.total);
      }
    } catch (error) {
      console.error("Error al obtener los movimientos:", error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchMovements(page, pageSize);
  }, [page, pageSize]);




  return (
    <>
      <div className=" row ">
        <Divider orientation="left">Reporte de movimientos</Divider>
        <Row >

          <Col span={24} className="px-2">

            <Form
              form={form}
              name="basicInformation"
              layout="vertical"
              initialValues={
                {
                  startDate:startDate, endDate:endDate
                }
              }
              onFinish={onFinish}
            >

              <Row gutter={16}>

                <Col className="gutter-row" span={4}>
                  <Form.Item
                    label="Desde"
                    name="startDate"
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      locale="es"
                      dateFormat="yyyy-MM-dd"
                      className="form-control text-secondary"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </Form.Item>
                </Col>


                <Col className="gutter-row" span={4}>
                  <Form.Item
                    label="Hasta"
                    name="endDate"
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      locale="es"
                      dateFormat="yyyy-MM-dd"
                      className="form-control text-secondary"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                    />
                  </Form.Item>
                </Col>


                <Col className="gutter-row" span={4}>
                  <Form.Item
                    label=" "
                  >
                    <Spin spinning={loading}>
                      <Button className="w-100" type="primary" htmlType="submit">
                        Buscar
                      </Button>

                    </Spin>

                  </Form.Item>
                </Col>



                <Col className="gutter-row" span={4}>
                  <Form.Item
                    label=" "
                  >
                    <Spin spinning={loading}>
                      <Button className="w-100 bg-success" type="primary" htmlType="button" onClick={downloadExcel} >
                        Exportar
                      </Button>

                    </Spin>

                  </Form.Item>
                </Col>


              </Row>


            </Form>

          </Col>



















          <Col span={24} >
            <Card style={{ overflow: 'auto', minHeight: '200px' }} >
              <Pagination
                className="text-success fw-bold"
                current={page}
                pageSize={pageSize}
                total={total}
                onChange={handlePageChange}
                pageSizeOptions={["4", "8", "16", "50"]}
                showTotal={(total) => `Total ${total} items`}
                showSizeChanger
                onShowSizeChange={(current, size) => handlePageChange(1, size)}
              />
              <Spin spinning={loading}>
                <Table
                  className="table-success"
                  dataSource={recordList}
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
export default ReportMovements;
