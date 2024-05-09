import { Button, Form, Input, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  LockOutlined,
  UserOutlined,
  NumberOutlined,
  CaretDownOutlined,
  MailOutlined,
  NodeIndexOutlined,
} from "@ant-design/icons";
import { clientRules } from "utils/rules";
import ClientService from "services/ClientService";
import { error, success } from "utils/notifications";
import { useNavigate } from "react-router-dom";

const ClientForm = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const urlId = window.location.pathname.split("/")[5];
  const edit = window.location.search.split("?")[1] === "action=edit";

  const onFinish = (values) => {
    setLoading(true);
    if (edit) {
      ClientService.updateClient(values, urlId).then((response) => {
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
    } else {
      ClientService.insertClient(values).then((response) => {
        if (response.status === 200) {
          success(messageApi, {
            content: "Cliente registrado correctamente",
          });
          setLoading(false);
          form.resetFields();
        } else {
          error(messageApi, {
            content: "Error al registrar el cliente",
          });
          setLoading(false);
        }
      });
    }
  };

  useEffect(() => {
    if (edit) {
      ClientService.getClient(urlId).then((response) => {
        form.setFieldsValue({
          identification: response.identification,
          name: response.name,
          email: response.email,
          address: response.address,
          contact: response.contact,
          type: response.type,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlId, edit]);

  const [loading, setLoading] = useState(false);

  return (
    <>
      {contextHolder}
      <div>
        <Form
          form={form}
          name="register-form"
          size="small"
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 10 }}
          initialValues={{
            identification: "",
            name: "",
            email: "",
            address: "",
            contactNumber: "",
            clientType: "",
          }}
        >
          <Form.Item
            name="identification"
            label="Nit / Cédula"
            rules={clientRules.identification}
            hasFeedback
          >
            <Input
              prefix={<UserOutlined className="text-primary" />}
              placeholder={
                "Ingrese el Nit (Con digito de verificación) o Cédula"
              }
              disabled={edit}
            />
          </Form.Item>
          <Form.Item
            name="name"
            label="Razón Social"
            rules={clientRules.businessName}
            hasFeedback
          >
            <Input prefix={<LockOutlined className="text-primary" />} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Correo Electrónico"
            rules={clientRules.email}
            hasFeedback
          >
            <Input
              prefix={<MailOutlined className="text-primary" />}
              disabled={edit}
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="Dirección"
            rules={clientRules.address}
            hasFeedback
          >
            <Input prefix={<NodeIndexOutlined className="text-primary" />} />
          </Form.Item>
          <Form.Item
            name="contact"
            label="Numero de contacto"
            rules={clientRules.contactNumber}
            hasFeedback
          >
            <Input prefix={<NumberOutlined className="text-primary" />} />
          </Form.Item>
          <Form.Item
            name="type"
            label="Tipo de cliente"
            rules={clientRules.type}
          >
            <Select
              placeholder="Seleccione Tipo de negocio"
              suffixIcon={<CaretDownOutlined className="text-primary" />}
              disabled={edit}
            >
              <Select.Option value="PALMA">Palma</Select.Option>
              <Select.Option value="BANANO">Banano</Select.Option>
              <Select.Option value="EXTRACTORA">Extractora</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 10,
            }}
          >
            <Button type="primary" htmlType="submit" block loading={loading}>
              {edit ? "Editar cliente" : "Registrar cliente"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ClientForm;
