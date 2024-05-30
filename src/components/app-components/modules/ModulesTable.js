import { Checkbox, Table, Tag } from "antd";
import React, { useMemo } from "react";

const ModulesTable = ({ dataSource }) => {
  
  const onChange = (e) => {
    e.checked ? (e.checked = false) : (e.checked = true);
    console.log(e);
  };

  const data = dataSource.map((item) => {
    console.log(item.module.name);
    item.module.name === "logistic" ? item.module.name = "Logística" : item.module.name = item.module.name.charAt(0).toUpperCase() + item.module.name.slice(1); 
    item.module.name === "Reception" ? item.module.name = "Porteria" : item.module.name = item.module.name.charAt(0).toUpperCase() + item.module.name.slice(1); 
    return {
      id: item.id,
      clientId: item.clientId,
      moduleName: item.module.name,
      moduleStatus: item.module.status,
      checked: item.state,
      status: item.state,
    };
  });


  const columns = useMemo(
    () => [
      {
        title: "Nombre",
        dataIndex: "moduleName",
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
          console.log(data),
          (
            <Checkbox
              onChange={() => {
                onChange(data);
              }}
            />
          )
        ),
      },
    ],
    []
  );

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        bordered
        size="middle"
        pagination={false}
      />
    </div>
  );
};

export default ModulesTable;
