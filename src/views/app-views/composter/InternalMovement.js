import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Divider, Select, Form, Checkbox, Input, Modal, Descriptions } from 'antd';
import { useSelector } from 'react-redux';
import { DatePicker, Space } from 'antd';
import { DeleteOutlined, NumberOutlined, ClockCircleOutlined , PlusSquareOutlined, SearchOutlined, CalendarOutlined } from '@ant-design/icons';
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
import fileDownload from 'js-file-download'
import Swal from 'sweetalert2'


export const InternalMovement = () => {

  const server = process.env.REACT_APP_SERVER;


  const [file, setFile] = useState(null);
  const [id, setId] = useState(0);
  const [estado, setEstado] = useState(0);


  const navigate = useNavigate();
  const paramsURL = useParams();
  const [form] = Form.useForm();
  const [formMachine] = Form.useForm();
  const fechaActual = moment().format("YYYY-MM-DD")
  const dateFormat = 'YYYY-MM-DD';

  const [detailsList, setDetailsList] = useState([])
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);


  const machineList = [
    { value: 1, label: 'KUBOTA - SENCILLA' },
    { value: 2, label: 'KUBOTA - CARGADOR' },
    { value: 3, label: 'MASSEY' },
    { value: 4, label: 'MENAR' },
    { value: 5, label: 'CARGADOR' },
    { value: 6, label: 'AIREADORA PEQ' },
    { value: 7, label: 'SIDE DUMP' }
  ]
  const lotList = [
    { value: 1, label: 'TUNEL 1 - LOTE 1' },
    { value: 2, label: 'TUNEL 2 - LOTE 1' },
    { value: 3, label: 'TUNEL 3 - LOTE 1' },
    { value: 4, label: 'TUNEL 4 - LOTE 1' },
    { value: 5, label: 'TUNEL 5 - LOTE 1' },
    { value: 6, label: 'TUNEL 6 - LOTE 1' },
    { value: 7, label: 'TUNEL 7 - LOTE 1' }
  ]

  const productList = [
    { value: 1, label: 'RAQUIS' },
    { value: 2, label: 'COMPOST' },
    { value: 3, label: 'LODO' },
    { value: 4, label: 'CENIZA' }
  ]




  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  

  const removeDetail = (id) => {        
    const details = detailsList.filter((machine) => machine.id !== id);
    const newList = [...details];
    setDetailsList(newList)
    message.info('Actividad de maquina removida');
  };






  const addMachine = (values) => {
    message.success('Actividad de maquina agregada');
    const machine = machineList.find((machine) => machine.value === values.machine);
    const uuid = uuidv4()
    const newDetail = {
      id: uuid,
      machineId: values.machineId,
      machineName: machine.label,
      time: values.time,
      description: values.activityDescription,
    };
    const updatedList = [...detailsList, newDetail];
    setDetailsList(updatedList)
    setOpen(false);
  };


 
  const { TextArea } = Input;






  const onFinish = (values) => {
    console.log('Success:', values);


    let ticket = parseInt(paramsURL.id)
    let estado = values.estado
    let descripcion = values.descripcion
    let usuario = localStorage.getItem("user_id")



    const formData = new FormData();
    formData.append('file', file);
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
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });

  };

  const onFinishFailed= (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  useEffect(() => {

  }, [])



  return (
    <>
      <div className=" row ">


        <Row gutter={[8, 8]}>

          <Col
            span={12}
          >

            <Divider orientation="left">Movimiento interno</Divider>

            <Card style={{ overflow: 'auto', height: '500px', backgroundColor: '#FFF' }} >

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

                  

                <Col className="gutter-row" span={24}>
                    <Form.Item
                      label="Lote"
                      name="origin"
                      rules={[{ required: true, message: 'Lote origen' }]}
                    >
                      <Select
                        disabled={false}
                        style={{ width: '100%' }}
                        options={lotList}
                      />
                    </Form.Item>
                  </Col>



                  
                <Col className="gutter-row" span={12}>
                    <Form.Item
                      label="date"
                      name="date"
                    >
                      <DatePicker style={{width:"100%"}} />
                    </Form.Item>
                  </Col>




                
                  <Col className="gutter-row" span={12}>
                    <Form.Item
                      label="Días de incremento"
                      name="days"
                      rules={[
                        {
                          required: true,
                          message: 'days',
                        },
                      ]}
                    >
                      <Input
                        prefix={<CalendarOutlined className="text-primary" />}
                        placeholder={
                          " Días que incrementa la actividad"
                        }
                      />
                    </Form.Item>
                  </Col>





                  <Col className="gutter-row" span={24}>
                    <Form.Item
                      label="Descripcion"
                      name="description"
                      rules={[{ required: true, message: 'descripción requerida' }]}
                    >
                      <TextArea rows={2} />
                    </Form.Item>
                  </Col>




                  <Col className="gutter-row" span={12}>
                    <Form.Item
                      label=" "
                    >
                      <Button className="w-100" type="primary" onClick={showModal} icon={<PlusSquareOutlined />} >
                        Agregar Actividad
                      </Button>
                    </Form.Item>
                  </Col>






                  <Col className="gutter-row" span={12}>
                    <Form.Item
                      label=" "
                    >
                      <Button className="w-100" type="primary" htmlType="submit">
                        Guardar
                      </Button>
                    </Form.Item>
                  </Col>




                  <Col className="gutter-row d-none" span={6}>
                    <Form.Item
                      label=" "
                    >
                      <Button className="w-100" danger >
                        Cancelar
                      </Button>
                    </Form.Item>
                  </Col>





                </Row>


              </Form>



            </Card>

          </Col>



          <Col span={12} >


            <Divider orientation="left">Tareas máquina</Divider>


            <Card style={{ overflow: 'auto', height: '500px', backgroundColor: '#FFF' }} >

              {
                detailsList.map(item => {
                    return (
                    <Card key={item.id} style={{ width: '100%', backgroundColor: '#FFF', boxShadow: "5px 5px 5px 1px rgba(200, 200, 200, 0.2)" }}  >
                      <Row gutter={4}>
                        <Col className="gutter-row" span={18}>
                          <strong>{item.machineName}</strong><br></br>
                          <b>Minutos:</b> {item.time}<br />
                          <b>Tarea:</b> {item.description}<br />

                        </Col>
                        <Col className="gutter-row" span={6}>
                          <Button className="w-100" htmlType="button" danger icon={<DeleteOutlined />}  onClick={() => removeDetail(item.id)} >
                            Eliminar
                          </Button>
                        </Col>

                      </Row>
                    </Card>
                  )
                })

              }
            </Card>

          </Col>


          <Col span={12}>



            <Modal
              open={open}
              title="Actividad maquina"
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >

              <Form
                key={10}
                form={formMachine}
                name="basicInformation"
                layout="vertical"
                initialValues={
                  {
                  }
                }
                onFinish={addMachine}
              >



                <Row gutter={16}>


                  <Col className="gutter-row" span={12}>
                    <Form.Item
                      label="Maquina"
                      name="machine"
                      rules={[{ required: true, message: 'Maquina requerida' }]}
                    >
                      <Select
                        disabled={false}
                        style={{ width: '100%' }}
                        options={machineList}
                      />
                    </Form.Item>
                  </Col>


                  <Col className="gutter-row" span={12}>
                    <Form.Item
                      label="Minutos"
                      name="time"
                      rules={[{ required: true, message: 'minutos requeridos' }]}
                    >
                      <Input
                        prefix={<ClockCircleOutlined  className="text-primary" />}
                        placeholder={"Minutos maquina"}
                      />
                    </Form.Item>
                  </Col>





                  <Col className="gutter-row" span={24}>
                    <Form.Item
                      label="Descripción de la actividad"
                      name="activityDescription"
                      rules={[{ required: true, message: 'descripción requerida' }]}
                    >
                      <TextArea rows={2} />
                    </Form.Item>
                  </Col>


                  <Col className="gutter-row" span={6}>
                    <Form.Item
                      label=" "
                    >
                      <Button className="w-100" type="primary" htmlType="submit">
                        Guardar
                      </Button>
                    </Form.Item>
                  </Col>




                  <Col className="gutter-row" span={6}>
                    <Form.Item
                      label=" "
                    >
                      <Button className="w-100" danger onClick={handleCancel} >
                        Cancelar
                      </Button>
                    </Form.Item>
                  </Col>




                </Row>


              </Form>



















            </Modal>




          </Col>




        </Row>









      </div>

    </>
  )
}
export default InternalMovement;
