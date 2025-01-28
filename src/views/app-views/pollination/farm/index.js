import { Form, Input } from 'antd'
import React from 'react'

const FarmIndex = () => {

  const onFinish = () => {
    console.log('Success:');
  };
  
  const onFinishFailed = () => {
    console.log("Failed:");
  };

  return (
    <div>
      <h1>Farm Index</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Farm Name"
          rules={[{ required: true, message: "Please input your farm name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Code"></Form.Item>
      </Form>
    </div>
  );
}

export default FarmIndex