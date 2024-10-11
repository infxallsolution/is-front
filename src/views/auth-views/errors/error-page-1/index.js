import React, { useEffect, useState, useCallback } from 'react'
import { Button, Row, Col, Input, Typography, Form, InputNumber } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import RedirectService from 'services/RedirectService';
import { useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone'
import { App } from 'antd';

import axios from 'axios';


import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const ErrorOne = ({ module }) => {

  const [file, setFile] = useState("NOK")


  let nameModule = "";
  switch (module) {
    case "planonomina":
      nameModule = "Plano de nominax";
      break
    case "planosalidas":
      nameModule = "Plano salidas de almacenx";
      break
    default: nameModule = "Plano salidas de almacenx";
      break

  }




  const props: UploadProps = {
    name: 'file',
    multiple: false,
    accept: ".xlsx",
    maxCount: 1,
    action: 'http://localhost:7000/api/plain/upload',

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
    },
    onRemove: async (e) => {
      console.log("va por aca")
      try {
        const response = await axios.delete(`http://localhost:7000/api/plain/delete/${file}`);
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
    RedirectService.redirectModule(module).then((res) => {
      setUrl(res.redirectTo)
    })
  }, [module, company])




  const handleSubmit = e => {
    e.preventDefault()


    if(file=="NOK"){
      message.error('Debe seleccionar un archivo.');
      return
    }
    console.log(e.target[0].value)
    console.log(acceptedFiles[0])

    const params = {
      plain: 1111,
      file: file
    }

    axios.get('http://localhost:7000/api/plain/convert', {
      params
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
    })
    .catch((error) => {
      message.error('Error al descargar el archivo.');
      console.error(error);
    });



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


            <Col xs={24} sm={24} md={12} className='p-4' >
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

            <Col xs={24} sm={24} md={12}  >

              <form onSubmit={handleSubmit}  >






                <Form.Item label="File server" className='mt-2 d-none'>
                  <Input
                    readOnly={true}
                    placeholder="Basic usage"
                    value={file}
                  />
                </Form.Item>

                <Form.Item label="Numero de documento" className='mt-3'>
                  <InputNumber
                    defaultValue={20}
                  />
                </Form.Item>

                <Form.Item label="Fecha">
                  <Input
                    defaultValue="20241004"
                  />
                </Form.Item>

                <Form.Item label="Notas">
                  <Input
                    defaultValue="Planos para nomina - "
                  />
                </Form.Item>

                <Form.Item label="Company">
                  <Input
                    htmlType="text"
                    defaultValue="001"
                  />
                </Form.Item>

                <Form.Item label="Tipo de documento">
                  <Input
                    htmlType="text"
                    defaultValue="WNM"
                  />
                </Form.Item>


                <Form.Item>
                  <Button
                    htmlType='submit'
                    type="primary"
                    style={{ width: '50%' }}
                  >Enviar
                  </Button>
                </Form.Item>


              </form>

            </Col>


          </Row>
        </div>
      </div>
    </div>
  );
};

export default ErrorOne
