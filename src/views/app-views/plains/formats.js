import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Form, Select } from "antd";

import { useSelector } from 'react-redux';
import axios from 'axios';
import { message } from 'antd';
import { env } from "configs/EnvironmentConfig";
const ULR_BASE = env.API_ENDPOINT_URL;


const PlanoSalidas = ({ module }) => {


  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  let nameModule = "Descargar formatos";


  const company = useSelector((state) => state?.companySlice?.company);

  const theme = useSelector((state) => state.theme.currentTheme);

  useEffect(() => {

  }, [module, company])



  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };




  const handleSubmit = async (values) => {
    const filename = values.format+".xlsx";
    const folder = "excel"  
    downloadFile(folder,filename)
  }



  
  const downloadFile = async (folder,filename) =>{

    try {
      const response = await axios({
        url: ULR_BASE+'/plain/download', // Endpoint de descarga
        method: 'GET',
        responseType: 'blob',
        params: {
          folder,
          filename
        }
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download',filename); // Nombre del archivo a descargar
      document.body.appendChild(link);
      link.click(); 
      link.remove();       
      setLoading(false);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      setLoading(false);
    }
  }


  return (
    <div className={`h-100 ${theme === "light" ? "bg-white" : ""}`}>
      <div className="container-fluid d-flex flex-column h-100 px-md-4 pb-md-4 pt-md-1">


        <div className="container">
          <Row align="top">
            <Col xs={24} sm={24} md={24}>
              <h1 className="font-weight-bold mb-4 display-4">
                {nameModule}
              </h1>

            </Col>


            <Col xs={24} sm={24} md={16}  >

              <Form
                form={form}
                name="register-form"
                size="small"
                onFinish={handleSubmit}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                initialValues={{
                  format: "nomina"
                }}
              >


                <Form.Item
                  wrapperCol={{
                    span: 10,
                  }}
                  name="format"
                  label="Formato:"
                  hasFeedback
                >
                  <Select
                    defaultValue="nomina"
                    onChange={handleChange}
                    options={[
                      { value: 'nomina', label: 'Plano para nomina' },
                      { value: 'salida', label: 'Plano para salida de insumos' },
                    ]}
                  />
                </Form.Item>





                <Form.Item
                  wrapperCol={{
                    offset: 6,
                    span: 10,
                  }}
                >
                  <Button type="primary" htmlType="submit" block loading={loading}>
                    Descargar
                  </Button>
                </Form.Item>


              </Form>

            </Col>


          </Row>
        </div>
      </div>
    </div>
  );
};

export default PlanoSalidas
