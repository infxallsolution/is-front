import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Divider, Select, Form, Input, Modal, Spin } from 'antd';
import { DatePicker } from 'antd';
import { DeleteOutlined,  ClockCircleOutlined, PlusSquareOutlined, CalendarOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { message } from 'antd';

import lotService from "services/lot-service";
import machineService from "services/machine-service";
import activityService from "services/activity-service";
import movementService from "services/movement-service";
import dayjs from "dayjs";

export const InternalMovement = () => {

  const [startDate, setStartDate] = useState(dayjs());
  const [form] = Form.useForm();
  const [formActivity] = Form.useForm();
  const [movementId,setMovementId] = useState("")
  const [productId,setProductId] = useState(1)
  const [actualDays,setActualDays] = useState(0)
  const [actualBalance,setActualBalance] = useState(0)
  const [loading,setLoading] = useState(false)



  

  const [lotList, setLotList] = useState([]);
  const [machineList, setMachineList] = useState([]);
  const [activityList, setActivityList] = useState([]);



  const [detailsList, setDetailsList] = useState([])
  const [open, setOpen] = useState(false);


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



  const clearForm = ()=>{
      form.resetFields()
      setDetailsList([])  
  }


  const removeDetail = (id) => {
    const details = detailsList.filter((machine) => machine.id !== id);
    const newList = [...details];
    setDetailsList(newList)
    console.log(newList)
    message.info('Actividad de maquina removida');
  };






  const addMachine = (values) => {

    let userId = localStorage.getItem("USER_ID")
    
    message.success('Actividad de maquina agregada');
    const machine = machineList.find((machine) => machine.id === values.machine);
    const uuid = uuidv4()
    const newDetail = {
      id: uuid,
      movementId,
      machineId: values.machine,
      machineName: machine.name,
      time: values.time,
      description: values.description,
      userId,
      state:true
    };
    const updatedList = [...detailsList, newDetail];
    setDetailsList(updatedList)
    setOpen(false);
  };



  const { TextArea } = Input;






  const onFinish = async (values) => {
    const id = movementId
    const lotId = values.lot
    const type = 3 // movimiento interno
    const activityId = values.activity
    const date = values.date
    const days = parseInt(values.days)
    const lotDays = parseInt(values.days)  +  parseInt(actualDays)
    const description = values.description
    const quantity = 0
    const balance = actualBalance
    const userId = localStorage.getItem("USER_ID")
    const state = true 
    const movement = {id,date,lotId,productId,quantity,type,activityId,days,description,userId,state,balance,lotDays}

    const movementDetails = detailsList.map((detail) => ({
      ...detail,
      movementId,
      activityId
    }));
    const data = {movement, movementDetails}
    setLoading(true);
    await movementService.insert(data)
    message.success("Registros ingresados")
    setLoading(false);
    form.resetFields();
    setDetailsList([])
    console.log("se ingresó")
    
    const uuid = uuidv4()
    setMovementId(uuid)


  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };




  const getLotList = async () => {
    const response = await lotService.getActiveList()
    if (response) {
      setLotList(response)
    }
  }



  const getMachineList = async () => {
    const response = await machineService.getActiveList()
    if (response) {
      setMachineList(response)
    }
  }

  const getActivityList = async () => {
    const response = await activityService.getActiveList()
    if (response) {
      setActivityList(response)
    }
  }


  useEffect(() => {
    getActivityList()
    getMachineList()
    getLotList()

    const uuid = uuidv4()
    setMovementId(uuid)


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
                    date:startDate
                  }
                }
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >



                <Row gutter={16}>


                  
                <Col className="gutter-row" span={12}>
                    <Form.Item
                      label="Fecha"
                      name="date"
                    >
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>







                <Col className="gutter-row" span={12}>
                    <Form.Item label="Lote" name="lot" >
                      <Select  
                      onChange={(value) => {
                        const selected = lotList.find((option) => option.id === value);
                        if (selected) {
                          setProductId(selected.productId)
                          setActualDays(selected.days)
                          setActualBalance(selected.balance)
                        }
                      }}                          
                      >
                        {lotList.map((option) => (
                          <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>


                  <Col className="gutter-row" span={12}>
                    <Form.Item label="Actividad" name="activity" >
                      <Select                      
                      onChange={(value) => {
                        const selected = activityList.find((option) => option.id === value);
                        if (selected) {
                          form.setFieldValue("description", selected.description);
                        }
                      }}                    
                      
                      >
                        {activityList.map((option) => (
                          <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>
                        ))}
                      </Select>
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
                      <Spin spinning={loading}>
                      <Button className="w-100" type="primary" htmlType="submit">
                        Guardar Registro
                      </Button>

                      </Spin>
                      
                    </Form.Item>
                  </Col>




                  <Col className="gutter-row" span={12} >
                    <Form.Item
                      label=" "
                    >
                      <Button className="w-100" danger onClick={clearForm} >
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
            <Button  className="w-50 mb-3" color="primary" type="primary" variant="outlined"  onClick={showModal} icon={<PlusSquareOutlined />} >
                        Agregar Actividad
                      </Button>
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
                          <Button className="w-100" htmlType="button" danger icon={<DeleteOutlined />} onClick={() => removeDetail(item.id)} >
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
                form={formActivity}
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
                      onChange={(value) => {
                        const selected = machineList.find((option) => option.id === value);
                        if (selected) {
                          console.log(selected.description)
                          formActivity.setFieldValue("description", selected.description);
                        }
                      }}                        
                      >
                        {machineList.map((option) => (
                          <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>


                  <Col className="gutter-row" span={12}>
                    <Form.Item
                      label="Minutos"
                      name="time"
                      rules={[{ required: true, message: 'minutos requeridos' }]}
                    >
                      <Input
                        prefix={<ClockCircleOutlined className="text-primary" />}
                        placeholder={"Minutos maquina"}
                      />
                    </Form.Item>
                  </Col>







                  <Col className="gutter-row" span={24}>
                    <Form.Item
                      label="Descripción de la actividad"
                      name="description"
                    >
                      <TextArea rows={2} />
                    </Form.Item>
                  </Col>


                  <Col className="gutter-row" span={6}>
                    <Form.Item
                      label=" "
                    >
                      <Button className="w-100" type="primary" htmlType="submit">
                        Agregar
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
