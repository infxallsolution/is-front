import { Form, Select } from "antd";
import React from "react";
import ModulesTable from "./ModulesTable";

const ModulesForm = () => {
  const { Option } = Select;

  const [form] = Form.useForm();

  return (
    <div>
      <Form
        form={form}
        size="middle"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{
            marginLeft: "20%",
        }}
      >
        <Form.Item>
          <Select placeholder={"Seleccione un cliente"}  >
            <Option value="demo">Aceites S.A</Option>
            <Option value="demo">Pälmaceite S.A</Option>
            <Option value="demo">Padornelo</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <ModulesTable />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ModulesForm;
