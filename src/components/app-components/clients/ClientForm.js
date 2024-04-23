import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import {
  LockOutlined,
  UserOutlined,
  NumberOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";

const ClientForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const rules = {
    identification: [
      {
        required: true,
        message: "Por favor ingrese su identificación!",
      },
    ],
    businessName: [
      {
        required: true,
        message: "Por favor ingresa su razón social!",
      },
    ],
    contactNumber: [
      {
        required: true,
        message: "Por favor ingresa su numero de contacto!",
      },
    ],
    clientType: [
      {
        required: true,
        message: "Por favor seleccione un tipo de cliente!",
      },
    ],
  };

  return (
    <div style={{}}>
      <Form
        form={form}
        name="register-form"
        size="small"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 10 }}
        // onFinish={onSignUp}
      >
        <Form.Item
          name="identification"
          label="Nit / Cédula"
          rules={rules.identification}
          hasFeedback
        >
          <Input prefix={<UserOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="businessName"
          label="Razón Social"
          rules={rules.businessName}
          hasFeedback
        >
          <Input prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="contactNumber"
          label="Numero de contacto"
          rules={rules.contactNumber}
          hasFeedback
        >
          <Input
            type="number"
            prefix={<NumberOutlined className="text-primary" />}
          />
        </Form.Item>
        <Form.Item
          name="clientType"
          label="Tipo de cliente"
          rules={[
            {
              required: true,
              message: "Please select a role!",
            },
          ]}
        >
          <Select
            placeholder="Seleccione Tipo de cliente"
            suffixIcon={<CaretDownOutlined className="text-primary" />}
          >
            <Select.Option value="lucy">Lucy</Select.Option>
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
