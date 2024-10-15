import React, { useEffect, useState, useCallback } from 'react'
import { Button, Row, Col, Input, Typography, Form, InputNumber, Select, DatePicker } from "antd";
import {
  LockOutlined,
  UserOutlined,
  NumberOutlined,
  CaretDownOutlined,
  MailOutlined,
  CalendarOutlined,
  FileTextOutlined,
  BankOutlined
} from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone'
import { App } from 'antd';
import ClientService from "services/ClientService";
import { error, success } from "utils/notifications";
import axios from 'axios';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';
import { env } from "configs/EnvironmentConfig";
const ULR_BASE = env.API_ENDPOINT_URL;

const PlanoNomina = ({ module }) => {



  const dateFormat = 'YYYY-MM-DD';
  const { Dragger } = Upload;
  const [form] = Form.useForm();
  const [file, setFile] = useState("NOK")
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  let nameModule = "Plano de nomina";



  const props: UploadProps = {
    name: 'file',
    multiple: false,
    fileList: fileList,
    accept: ".xlsx",
    maxCount: 1,
    action: ULR_BASE+'/plain/upload',

    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        const response = info.file.response;
        if (response && response.status === 'success') {
          // Procesa los datos del archivo subido
          const { originalname, filename, path, size } = response.file;
          message.success(`${originalname} subido exitosamente.`);
          setFile(filename)
        } else {
          message.error('Error en la respuesta del servidor.');
        }
        // message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }


      setFileList(info.fileList);

    },
    onRemove: async (e) => {
      console.log("va por aca")

      try {
        const response = await axios.delete(`${ULR_BASE}/api/plain/delete/${file}`);
        if (response.data.status === 'success') {
          console.log('Archivo eliminado exitosamente.');
          setFile("")
        } else {
          console.error('Error al eliminar el archivo:', response.data.message);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }

    },
  };







  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop })




  const company = useSelector((state) => state?.companySlice?.company);

  const theme = useSelector((state) => state.theme.currentTheme);
  const [url, setUrl] = useState("")

  useEffect(() => {

  }, [module, company])




  const handleSubmit = (values) => {

    setLoading(true);
    if (file == "NOK") {
      message.error('Debe seleccionar un archivo.');
      setLoading(false);
      return
    }

    console.log(acceptedFiles[0])
    const params = {
      ...values,
      file: file
    }

    console.log(params)


    axios.post(ULR_BASE+'/api/plain/plainnomina', {
      ...params
    })
      .then((response) => {
        // Crear un enlace para la descarga del archivo
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const plainName = file.replace(".xlsx", '.txt')
        link.setAttribute('download', plainName); // Nombre del archivo a descargar
        document.body.appendChild(link);
        link.click(); // Ejecutar la descarga
        link.remove();
        setLoading(false);
        setFileList([]);
      })
      .catch((error) => {
        message.error('Error al descargar el archivo.');
        console.error(error);
        setLoading(false);
      });
  }



  const onFinish = (values) => {
    setLoading(true);
    ClientService.updateClient(values, "idplano").then((response) => {
      if (response.status === 200) {
        success(messageApi, {
          content: "Cliente actualizado correctamente",
        });
        setLoading(false);
        form.resetFields();
        navigate("/app/admin/clients/list");
      } else {
        error(messageApi, {
          content: "Error al actualizar el cliente",
        });
        setLoading(false);
      }
    });
    return;
  };

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


            <Col xs={24} sm={24} md={8} className='p-4' >
              <Dragger {...props}   >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click o arrastre para subir</p>
                <p className="ant-upload-hint">
                  Solo se aceptan archivos con extensión xlsx.
                </p>
              </Dragger>

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
                  numero: "20",
                  notas: "PLANO NOMINA - ",
                  fecha: dayjs(selectedDate, dateFormat),
                  company: "001",
                  type: "WNM"
                }}
              >


                <Form.Item
                  name="fecha"
                  label="Fecha"
                  hasFeedback
                  rules={[{ required: true, message: 'Seleccione una fecha' }]}
                >
                  <DatePicker
                  />

                </Form.Item>

                <Form.Item
                  name="numero"
                  label="Consecutivo"
                  hasFeedback
                  rules={[{ required: true, message: 'Dato requerido' }, { max: 8, message: 'Maximo 8 caracteres' }]}
                >
                  <Input
                    prefix={<NumberOutlined className="text-primary" />}
                    placeholder={
                      "Consecutivo del documento"
                    }
                  />
                </Form.Item>




                <Form.Item
                  name="notas"
                  label="Notas"
                  rules={[{ required: true, message: 'Dato requerido' }, { max: 255, message: 'Maximo 255 caracteres' }]}
                  hasFeedback
                >
                  <Input
                    prefix={<FileTextOutlined className="text-primary" />}
                  />
                </Form.Item>

                <Form.Item
                  hidden={true}
                  name="company"
                  label="Company"
                  hasFeedback
                >
                  <Input
                    prefix={<BankOutlined className="text-primary" />}
                  />
                </Form.Item>



                <Form.Item
                  name="type"
                  label="Documento"
                  rules={[{ required: true, message: 'Dato requerido' }, { max: 3, message: 'Maximo 3 caracteres' }]}
                  hasFeedback
                >
                  <Input
                    prefix={<FileTextOutlined className="text-primary" />}
                  />
                </Form.Item>



                <Form.Item
                  wrapperCol={{
                    offset: 6,
                    span: 10,
                  }}
                >
                  <Button type="primary" htmlType="submit" block loading={loading}>
                    Convertir archivo
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

export default PlanoNomina
