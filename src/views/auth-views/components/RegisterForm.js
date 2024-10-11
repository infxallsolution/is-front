import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  LockOutlined,
  UserOutlined,
  NumberOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Alert, Select } from "antd";
import {
  signUp,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
} from "store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

export const RegisterForm = (props) => {
  const {
    signUp,
    showLoading,
    token,
    loading,
    redirect,
    message,
    showMessage,
    hideAuthMessage,
    allowRedirect = true,
  } = props;
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onSignUp = () => {
    form
      .validateFields()
      .then((values) => {
        showLoading();
        signUp(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  useEffect(() => {
    if (token !== null && allowRedirect) {
      navigate(redirect);
    }
    if (showMessage) {
      const timer = setTimeout(() => hideAuthMessage(), 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: showMessage ? 1 : 0,
          marginBottom: showMessage ? 20 : 0,
        }}
      >
        <Alert type="error" showIcon message={message}></Alert>
      </motion.div>
      <Form
        form={form}
        layout="vertical"
        name="register-form"
        onFinish={onSignUp}
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
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Registrar cliente
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  signUp,
  showAuthMessage,
  hideAuthMessage,
  showLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
