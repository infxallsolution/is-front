import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import {
  LockOutlined,
  UserOutlined,
  NumberOutlined,
  CaretDownOutlined,
  MailOutlined,
  NodeIndexOutlined,
} from "@ant-design/icons";
import { clientRules } from "utils/rules";

const ClientForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("form: ", values);
    form.resetFields();
  }

  const [loading, setLoading] = useState(false);

  return (
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
            placeholder={"Ingrese el Nit (Con digito de verificación) o Cédula"}
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
          <Input prefix={<MailOutlined className="text-primary" />} />
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
          name="contactNumber"
          label="Numero de contacto"
          rules={clientRules.contactNumber}
          hasFeedback
        >
          <Input
            type="number"
            prefix={<NumberOutlined className="text-primary" />}
          />
        </Form.Item>
        <Form.Item name="type" label="Tipo de cliente" rules={clientRules.type}>
          <Select
            placeholder="Seleccione Tipo de negocio"
            suffixIcon={<CaretDownOutlined className="text-primary" />}
          >
            <Select.Option value="PALM">Palma</Select.Option>
            <Select.Option value="BANANA">Banano</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 10,
          }}
        >
          <Button type="primary" htmlType="submit" block loading={loading}>
            Registrar cliente
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ClientForm;
