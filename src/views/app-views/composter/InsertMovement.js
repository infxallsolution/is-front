import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Divider, Select, Form, Checkbox, type FormProps, Input } from 'antd';
import { useSelector } from 'react-redux';
import { DatePicker, Space } from 'antd';
import { NumberOutlined, SearchOutlined } from '@ant-design/icons';
import { icon_responsable } from '../../../img/responsable.png'
import { icon_admin } from '../../../img/admin.png'
import { icon_solicitante } from '../../../img/solicitante.png'
import axios from "axios";
import moment from 'moment';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

import { ROW_GUTTER } from 'constants/ThemeConstant';
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, List } from 'antd';
import Swal from 'sweetalert2'


export const InsertMovement = () => {

  const server = process.env.REACT_APP_SERVER;


  const [id, setId] = useState(0);
  const [estado, setEstado] = useState(0);




  const navigate = useNavigate();
  const paramsURL = useParams();
  const [form] = Form.useForm();
  const fechaActual = moment().format("YYYY-MM-DD")
  const dateFormat = 'YYYY-MM-DD';

  const [listMovimientos, setListMovmientos] = useState([])



  const handleCancel = () => {
    navigate("/app/tickets/tickets-responsable")
  };



  const machineList = [
    { value: 1, label: 'KUBOTA - SENCILLA' },
    { value: 2, label: 'KUBOTA - CARGADOR' },
    { value: 3, label: 'MASSEY' },
    { value: 4, label: 'MENAR' },
    { value: 5, label: 'CARGADOR' },
    { value: 6, label: 'AIREADORA PEQ' },
    { value: 7, label: 'SIDE DUMP' }
  ]



  const storeList = [
    { value: 1, label: 'TUNEL 1' },
    { value: 2, label: 'TUNEL 2' },
    { value: 3, label: 'TUNEL 3' },
    { value: 4, label: 'TUNEL 4' },
    { value: 5, label: 'TUNEL 5' },
    { value: 6, label: 'TUNEL 6' },
    { value: 7, label: 'TUNEL 7' }
  ]




  const listaMotivos = [
    { value: 1, label: 'Soporte sistemas operativos' },
    { value: 2, label: 'Soporte ERP SIESA' },
    { value: 3, label: 'Soporte INFOS' },
    { value: 4, label: 'Soporte Otros dispositivos' }]

  const listaCriticidad = [
    { value: 1, label: 'Baja' },
    { value: 2, label: 'Media' },
    { value: 3, label: 'Alta' }]

  const listaEstados = [
    { value: 1, label: 'Creado' },
    { value: 2, label: 'En proceso' },
    { value: 3, label: 'Terminado' }]

  const listaResponsable = [
    { value: 1, label: 'Juan Pineda' },
    { value: 2, label: 'Hector Ballestas' },
    { value: 3, label: 'Ernesto Jaraba' },
    { value: 4, label: 'Carlos Gonzalez' },
    { value: 5, label: 'Juan Rueda' }]



  const { TextArea } = Input;







  const InserMovement = (id) => {

    let url = server + "/api/tickets/getticket?id=" + id
    axios.get(url, { id })
      .then((response) => {
        var result = response.data
        //console.log(result)
        form.setFieldValue("motivo", result.motivo)
        form.setFieldValue("criticidad", result.criticidad)
        form.setFieldValue("responsable", result.responsable)
        form.setFieldValue("estado", result.estado)
        setEstado(result.estado)

      }
      )
      .catch((error) => { console.log("Error al consultar los datos") })


    cargarMovimientos(id)


  }



  const cargarMovimientos = (id) => {
    let url_m = server + "/api/Tickets/getMovimientosTicket?id_ticket=" + id
    axios.get(url_m, { id })
      .then((response_m) => {
        var result_m = response_m.data.result
        console.log(result_m)
        setListMovmientos(result_m)
      }
      )
      .catch((error) => { console.log("Error al consultar los datos") })
  }




  const onFinish = (values) => {
    console.log('Success:', values);


    let ticket = parseInt(paramsURL.id)
    let estado = values.estado
    let descripcion = values.descripcion
    let usuario = localStorage.getItem("user_id")



    const formData = new FormData();
    formData.append('id', id);
    formData.append('ticket', ticket);
    formData.append('fecha', fechaActual);
    formData.append('estado', estado);
    formData.append('descripcion', descripcion);
    formData.append('usuario', usuario);

    let url = server + "/api/tickets/insertMovimiento"
    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        //form.resetFields();
        Swal.fire({
          icon: "success",
          title: "Realizado!",
          showConfirmButton: false,
          timer: 1000
        });
        form.setFieldValue("descripcion", "")
        cargarMovimientos(ticket)
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  useEffect(() => {

    let idTicket = paramsURL.id;
    InserMovement(idTicket)

  }, [])



  return (
    <>
      <div className=" row ">
        <Divider orientation="left">Ingresar movimiento #{paramsURL.id} .</Divider>


        <Row gutter={[8, 8]}>

          <Col
            span={12}
          >
            <Card>

              <Form
                form={form}
                name="basicInformation"
                layout="vertical"
                initialValues={
                  {
                  }
                }
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >



                <Row gutter={16}>


                  <Col className="gutter-row" span={12}>
                    <Form.Item
                      label="Bodega origen"
                      name="origin"
                      rules={[
                        {
                          required: true,
                          message: 'Bodega origen',
                        },
                      ]}
                    >
                      <Select
                        disabled={false}
                        style={{ width: '100%' }}
                        options={storeList}
                      />
                    </Form.Item>
                  </Col>



                  <Col className="gutter-row" span={12}>
                    <Form.Item
                      label="Bodega destino"
                      name="destination"
                      rules={[
                        {
                          required: true,
                          message: 'Bodega destino',
                        },
                      ]}
                    >
                      <Select
                        disabled={false}
                        style={{ width: '100%' }}
                        options={storeList}
                      />
                    </Form.Item>
                  </Col>





                  <Col className="gutter-row" span={12}>
                    <Form.Item
                      label="Kilogramos"
                      name="quantity"
                      rules={[
                        {
                          required: true,
                          message: 'Quantity',
                        },
                      ]}
                    >
                      <Input
                        prefix={<NumberOutlined className="text-primary" />}
                        placeholder={
                          "Consecutivo del documento"
                        }
                      />
                    </Form.Item>
                  </Col>






                  <Col className="gutter-row" span={12}>
                    <Form.Item
                      label="Estado"
                      name="estado"
                      rules={[
                        {
                          required: true,
                          message: 'Seleccione un estado!'
                        },
                      ]}
                    >
                      <Select
                        disabled={localStorage.getItem("rol") == 3}
                        style={{ width: '100%' }}
                        options={listaEstados}
                      />
                    </Form.Item>
                  </Col>






                  <Col className="gutter-row" span={24}>
                    <Form.Item
                      label="Nuevo mensaje"
                      name="descripcion"
                    >
                      <TextArea rows={4} />
                    </Form.Item>
                  </Col>



                  <Col className="gutter-row" span={6}>
                    <Form.Item
                      label=" "
                    >
                      <button type="submit" className="btn btn-primary w-100  ml-2"  >
                        Responder
                      </button>
                    </Form.Item>
                  </Col>



                  <Col className="gutter-row" span={6}>
                    <Form.Item
                      label=" "
                    >
                      <button className="btn btn-secondary w-100 ml-2" onClick={handleCancel} >
                        Regresar
                      </button>
                    </Form.Item>
                  </Col>





                </Row>


              </Form>
            </Card>

          </Col>



          <Col span={12} >

            <Card style={{ overflow: 'auto', height: '600px' }} >

              {

                listMovimientos.map(item => {



                  return (
                    <Card key={item.id} style={{ width: '100%' }}>
                      <Row gutter={4}>
                        <Col className="gutter-row" span={3}>
                          <div className="justify-content-center align-items-center" style={{ width: '100%' }} alt="Avatar">
                            <img src={`https://api.dicebear.com/8.x/initials/svg?seed=${item.nombre_usuario}&radius=20&backgroundColor=0d6efd`} className=" m-3" alt="..." />
                          </div>

                        </Col>





                      </Row>


                    </Card>
                  )

                })


              }




              <Row gutter={16}>
                <Col className="gutter-row" span={12}>



                </Col>
              </Row>
            </Card>

          </Col>




        </Row>









      </div>

    </>
  )
}
export default InsertMovement;
