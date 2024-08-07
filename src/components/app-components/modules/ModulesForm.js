import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import ModulesTable from "./ModulesTable";
import ClientService from "services/ClientService";
import ModuleService from "services/ModuleService";

const ModulesForm = () => {
  const [clients, setClients] = useState([]);
  const [clientModule, setClientModule] = useState("");
  const [modules, setModules] = useState([]); // [1]
  const { Option } = Select;

  useEffect(() => {
    ClientService.getAllClients().then((response) => {
      setClients(response);
    });
  }, [clientModule]);

  const onChange = (value) => {
    setClientModule(value)
  }

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
          <Select placeholder={"Seleccione un cliente"} onChange={onChange}>
            {clients.map((client, index) => {
              return (
                <Option key={index} value={client.id}>
                  {client.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item>
          <ModulesTable clientId={clientModule} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ModulesForm;
