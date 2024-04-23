import { Checkbox, Table } from 'antd'
import React from 'react'

const columns = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Descripción",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Acción",
    dataIndex: "action",
    render: (__, data) => (
      <Checkbox
        onChange={() => {
          onChange(data);
        }}
      />
    ),
  },
];

const onChange = (e) => {
  e.checked ? (e.checked = false) : (e.checked = true);
  console.log(e);
};

const dataSource  = [
  {
    id: "1",
    key: "1",
    name: "Agro",
    description: "Modulo de agronomico",
  },
  {
    id: "2",
    key: "2",
    name: "Conta",
    description: "Modulo de contabilidad",
  },
  {
    id: "3",
    key: "3",
    name: "Admin",
    description: "Modulo de administracion",
  },
  {
    id: "4",
    key: "4",
    name: "Nomi",
    description: "Modulo de nomina",
  },
];

const ModulesTable = () => {
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        size='middle'
        pagination={false}
      />
    </div>
  );
}

export default ModulesTable