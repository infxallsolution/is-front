import { Checkbox, Table, Tag } from "antd";
import React, { useMemo } from "react";

const onChange = (e) => {
  e.checked ? (e.checked = false) : (e.checked = true);
  console.log(e);
};

const ModulesTable = ({ dataSource }) => {
  const columns = useMemo(
    () => [
      {
        title: "Nombre",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Status",
        dataIndex: "state",
        key: "state",
        render: (state) => {
          return state ? (
            <Tag color="green">Activo</Tag>
          ) : (
            <Tag color="red">Inactivo</Tag>
          );
        },
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
    ],
    []
  );

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        size="middle"
        pagination={false}
      />
    </div>
  );
};

export default ModulesTable;
