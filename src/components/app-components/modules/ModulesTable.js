import { Checkbox, Table, Tag } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import ModuleService from "services/ModuleService";

const ModulesTable = ({ clientId }) => {

  const [modules, setModules] = useState([])

  useEffect(() => {
    ModuleService.getModuleByClient(clientId).then((response) => {
      setModules(
        response.map((item) => {
          item.module.name === "logistic"
            ? (item.module.name = "Logística")
            : (item.module.name =
                item.module.name.charAt(0).toUpperCase() +
                item.module.name.slice(1));
          item.module.name === "Reception"
            ? (item.module.name = "Porteria")
            : (item.module.name =
                item.module.name.charAt(0).toUpperCase() +
                item.module.name.slice(1));
          return {
            id: item.id,
            clientId: item.clientId,
            moduleName: item.module.name,
            moduleId: item.module.id,
            moduleStatus: item.module.state,
            checked: item.state,
            status: item.state,
          };
        })
      );
    });
  }, [clientId])
  
  const columns = useMemo(
    () => [
      {
        title: "Nombre",
        dataIndex: "moduleName",
        key: "name",
      },
      {
        title: "Modulo asociado",
        dataIndex: "status",
        key: "status",
        render: (status) => {
          return status ? (
            <Tag color="green">Activo</Tag>
          ) : (
            <Tag color="red">Inactivo</Tag>
          );
        },
      },
      {
        title: "Acción",
        dataIndex: "action",
        render: (__, data) => {
          return (
            <Checkbox
              checked={data?.status}
              onChange={() => {
                if(data.status){
                  ModuleService.deleteModuleClient({
                    clientId: data.clientId,
                    moduleId: data.moduleId,
                    state: !data.status,
                  }).then((response) => {
                    setModules((prev) => {
                      return prev.map((item) => {
                        if (item.id === data.id) {
                          return {
                            ...item,
                            status: !item.status,
                          };
                        }
                        return item;
                      });
                    });
                  })
                }else{
                  ModuleService.insertModuleClient({
                    clientId: data.clientId,
                    moduleId: data.moduleId,
                    state: !data.status,
                  }).then((response) => {
                    setModules((prev) => {
                      return prev.map((item) => {
                        if (item.id === data.id) {
                          return {
                            ...item,
                            status: !item.status,
                          };
                        }
                        return item;
                      });
                    });
                    
                  });
                }
              }}
            />
          );
        },
      },
    ],
    [modules]
  );

  return (
    <div>
      <Table
        dataSource={modules}
        columns={columns}
        bordered
        size="middle"
        pagination={false}
      />
    </div>
  );
};

export default ModulesTable;
