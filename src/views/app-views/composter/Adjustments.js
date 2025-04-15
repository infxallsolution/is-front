import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Divider, Select, Form, Input, Modal } from 'antd';
import { DatePicker } from 'antd';
import { DeleteOutlined, NumberOutlined, ClockCircleOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { message } from 'antd';

import lotService from "services/lot-service";
import machineService from "services/machine-service";
import movementService from "services/movement-service";
import dayjs from "dayjs";


export const Adjustments = () => {

  const [startDate, setStartDate] = useState(dayjs());
  const [hiddenSave, setHiddenSave] = useState(false)
  const [form] = Form.useForm();
  const [formActivity] = Form.useForm();
  const [movementIdOrigin, setMovementIdOrigin] = useState("")
  const [productId, setProductId] = useState(1)
  const [actualDaysOrigin, setActualDaysOrigin] = useState(0)


  const [balanceOrigin, setBalanceOrigin] = useState(0)


  const [lotList, setLotList] = useState([]);
  const [machineList, setMachineList] = useState([]);


  const [detailsList, setDetailsList] = useState([])
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);


  const clearForm = () => {
    form.resetFields()
    setDetailsList([])
    setHiddenSave(false)
  }

  const toUpperTicket = (e) => {
    const upperWord = e.target.value.toUpperCase()
    console.log(upperWord)
    form.setFieldValue("ticket", upperWord);
  };



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



  const { TextArea } = Input;

  const onFinish = async (values) => {


    setLoading(true)
    let id = movementIdOrigin
    let lotId = values.origin
    let ticket = ""
    console.log("2")
    //let type = 5/6 ////Ajuste
    let date = values.date
    let days = 0
    let type = 5
    let activityId = 5
    console.log("22")
    let quantity =0
    let newBalance = parseInt(values.quantity)
    console.log("222")
    let balance = parseInt(values.balance)
    
    console.log("2222")

    if(balance>newBalance){
      message.success("es una ajuste negativo")
      type = 6
      activityId = 6
      quantity = balance-newBalance
    }
    else if(balance<newBalance){
      message.success("es un ajuste positivo")
      type = 5
      activityId = 5
      quantity = newBalance-balance
    }
    else{
      message.error("La cantidad de material no tuvo variación")
      return;
    }

    balance = newBalance;

   
    let description = values.description
    let userId = localStorage.getItem("USER_ID")
    let state = true
    const movementOrigin = { id, date, lotId, productId, quantity, type, activityId, days, description, userId, state, balance,ticket }


    const movementDetails = detailsList.map((detail) => ({
      ...detail,
      movementId: movementIdOrigin,
      activityId
    }));
    const dataOut = { movement: movementOrigin, movementDetails: movementDetails }
    await movementService.insert(dataOut)
    console.log("se registro el ajuste")

    form.resetFields()
    setDetailsList([])
    setLoading(false)


    const uuidOrigin = uuidv4()
    setMovementIdOrigin(uuidOrigin)

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



  useEffect(() => {
    getMachineList()
    getLotList()
    const uuidOrigin = uuidv4()
    setMovementIdOrigin(uuidOrigin)




  }, [])



  return (
    <>
      <div className=" row ">
        <Row gutter={[8, 8]}>
          <Col
            span={12}
          >

            <Divider orientation="left">Ajuste de inventario</Divider>

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
                    <Form.Item label="Lote productivo" name="origin" >
                      <Select
                        onChange={(value) => {
                          const selected = lotList.find((option) => option.id === value);
                          if (selected) {
                            setProductId(selected.productId)
                            setActualDaysOrigin(selected.days)
                            setBalanceOrigin(selected.balance)
                            form.setFieldValue("quantity", selected.balance);
                            form.setFieldValue("balance", selected.balance);
                            console.log(selected.balance)

                            if (selected.balance <= 0) {
                              //message.error("Lote sin saldo")
                              //setHiddenSave(true)
                            }
                            else {
                              //message.info("Lote con saldo")
                              //setHiddenSave(false)
                            }

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
                    <Form.Item
                      label="Saldo original"
                      name="balance"
                    >
                      <Input
                      readOnly={true}
                        prefix={<NumberOutlined className="text-primary" />}
                        placeholder={
                          " Saldo original"
                        }
                      />
                    </Form.Item>
                  </Col>



                  <Col className="gutter-row" span={12}>
                    <Form.Item
                      label="Nuevo saldo"
                      name="quantity"
                      rules={[
                        {
                          required: true,
                          message: 'quantity',
                        },
                      ]}
                    >
                      <Input
                        prefix={<NumberOutlined className="text-primary" />}
                        placeholder={
                          " Kilogramos del traslado"
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


                  <Col className="gutter-row" span={8}  hidden={hiddenSave} >
                    <Form.Item
                      label=" "
                    >
                      <Button className="w-100" type="primary" htmlType="submit">
                        Guardar
                      </Button>
                    </Form.Item>
                  </Col>

                  <Col className="gutter-row" span={8}>
                    <Form.Item
                      label=" "
                    >
                      <Button className="w-100" danger  onClick={clearForm}  >
                        Cancelar
                      </Button>
                    </Form.Item>
                  </Col>

                </Row>
              </Form>
            </Card>
          </Col>


        </Row>
      </div>
    </>
  )
}
export default Adjustments;
